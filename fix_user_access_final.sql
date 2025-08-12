-- Final fix for user access issues - handles existing policies
-- This script addresses the core service role permission issue

-- 1. Drop existing policies that might conflict
SELECT '=== CLEANING UP EXISTING POLICIES ===' as step;
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "service_role_full_access" ON public.users;
DROP POLICY IF EXISTS "admin_full_access" ON public.users;

-- 2. Create the trigger function to auto-create user profiles (if not exists)
SELECT '=== CREATING TRIGGER FUNCTION ===' as step;
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, has_access, is_admin)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(COALESCE(NEW.email,''),'@',1)),
    false, -- Default to no access
    false  -- Default to not admin
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 3. Create the trigger on auth.users (if not exists)
SELECT '=== CREATING TRIGGER ===' as step;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Create proper RLS policies
SELECT '=== CREATING RLS POLICIES ===' as step;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Users can update their own profile (except has_access and is_admin)
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() AND
    has_access = OLD.has_access AND  -- Cannot change their own access
    is_admin = OLD.is_admin          -- Cannot change their own admin status
  );

-- CRITICAL: Service role can update any user (for webhooks)
CREATE POLICY "service_role_full_access" ON public.users
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Admins can update any user
CREATE POLICY "admin_full_access" ON public.users
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 5. Create missing user profiles for existing auth users
SELECT '=== CREATING MISSING USER PROFILES ===' as step;
INSERT INTO public.users (id, email, name, has_access, is_admin)
SELECT 
  au.id,
  COALESCE(au.email, ''),
  COALESCE(au.raw_user_meta_data->>'name', split_part(COALESCE(au.email,''),'@',1)),
  false, -- Default to no access
  false  -- Default to not admin
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 6. Grant necessary permissions to service role
SELECT '=== GRANTING PERMISSIONS ===' as step;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.payments TO service_role;

-- 7. Test service role access directly
SELECT '=== TESTING SERVICE ROLE ACCESS ===' as step;
-- This will show if service role can access the users table
SELECT 
  'Service role can read users' as test,
  CASE WHEN EXISTS (
    SELECT 1 FROM public.users LIMIT 1
  ) THEN '✅ PASS' ELSE '❌ FAIL' END as status;

-- 8. Verify the setup
SELECT '=== VERIFICATION ===' as step;
SELECT 
  'Trigger exists' as check_item,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'on_auth_user_created'
  ) THEN '✅ PASS' ELSE '❌ FAIL' END as status
UNION ALL
SELECT 
  'RLS enabled' as check_item,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'users' AND rowsecurity = true
  ) THEN '✅ PASS' ELSE '❌ FAIL' END as status
UNION ALL
SELECT 
  'Service role policy exists' as check_item,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'service_role_full_access'
  ) THEN '✅ PASS' ELSE '❌ FAIL' END as status;

-- 9. Show current policies
SELECT '=== CURRENT POLICIES ===' as step;
SELECT 
  policyname,
  cmd,
  permissive,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public'
ORDER BY policyname;

-- 10. Show users without profiles (should be 0 after fix)
SELECT '=== USERS WITHOUT PROFILES (should be 0) ===' as step;
SELECT COUNT(*) as users_without_profiles
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;
