-- Complete fix for user access issues
-- This script addresses all the problems identified in the analysis

-- 1. First, let's clean up any conflicting policies
SELECT '=== CLEANING UP CONFLICTING POLICIES ===' as step;
DROP POLICY IF EXISTS "allow_all_select" ON public.users;
DROP POLICY IF EXISTS "allow_authenticated_insert" ON public.users;
DROP POLICY IF EXISTS "allow_own_update" ON public.users;
DROP POLICY IF EXISTS "allow_own_delete" ON public.users;
DROP POLICY IF EXISTS "service_role_update_access" ON public.users;
DROP POLICY IF EXISTS "admin_update_access" ON public.users;

-- 2. Ensure users table has the correct structure
SELECT '=== ENSURING CORRECT TABLE STRUCTURE ===' as step;
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  has_access boolean NOT NULL DEFAULT false,
  is_admin boolean NOT NULL DEFAULT false,
  access_expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Create the trigger function to auto-create user profiles
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

-- 4. Create the trigger on auth.users
SELECT '=== CREATING TRIGGER ===' as step;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 5. Create proper RLS policies
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

-- Service role can update any user (for webhooks)
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

-- 6. Create missing user profiles for existing auth users
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

-- 7. Grant necessary permissions
SELECT '=== GRANTING PERMISSIONS ===' as step;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.payments TO service_role;

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
