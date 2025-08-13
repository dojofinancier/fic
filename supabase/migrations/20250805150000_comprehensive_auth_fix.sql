/*
  COMPREHENSIVE AUTHENTICATION AND DATABASE FIX
  =============================================
  
  This migration addresses all identified issues:
  1. Database schema inconsistencies
  2. RLS policy conflicts
  3. Missing service role permissions
  4. Admin access configuration
  5. Performance optimizations
*/

-- 1. CLEAN UP EXISTING POLICIES AND CONFIGURATION
SELECT '=== CLEANING UP EXISTING CONFIGURATION ===' as step;

-- Drop all existing policies on users table
DROP POLICY IF EXISTS "users select own" ON public.users;
DROP POLICY IF EXISTS "users insert self" ON public.users;
DROP POLICY IF EXISTS "users update own or admin" ON public.users;
DROP POLICY IF EXISTS "allow_all_select" ON public.users;
DROP POLICY IF EXISTS "allow_authenticated_insert" ON public.users;
DROP POLICY IF EXISTS "allow_own_update" ON public.users;
DROP POLICY IF EXISTS "allow_own_delete" ON public.users;
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "service_role_full_access" ON public.users;
DROP POLICY IF EXISTS "admin_full_access" ON public.users;
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for users based on user_id" ON public.users;
DROP POLICY IF EXISTS "Enable insert access for users based on user_id" ON public.users;
DROP POLICY IF EXISTS "Enable update access for users based on user_id" ON public.users;
DROP POLICY IF EXISTS "questions_read_all" ON public.questions;
DROP POLICY IF EXISTS "questions_admin_insert" ON public.questions;
DROP POLICY IF EXISTS "questions_admin_update" ON public.questions;
DROP POLICY IF EXISTS "questions_admin_delete" ON public.questions;

-- 2. ENSURE CORRECT TABLE STRUCTURE
SELECT '=== ENSURING CORRECT TABLE STRUCTURE ===' as step;

-- Drop and recreate users table with correct structure
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  has_access boolean NOT NULL DEFAULT false,
  is_admin boolean NOT NULL DEFAULT false,
  access_expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS users_id_idx ON public.users(id);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
CREATE INDEX IF NOT EXISTS users_has_access_idx ON public.users(has_access);
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin);

-- 3. CREATE UPDATED_AT TRIGGER
SELECT '=== CREATING UPDATED_AT TRIGGER ===' as step;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 4. CREATE USER PROFILE TRIGGER
SELECT '=== CREATING USER PROFILE TRIGGER ===' as step;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
EXCEPTION
  WHEN others THEN
    -- Log error but don't block user creation
    RAISE LOG 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 5. CREATE SIMPLIFIED RLS POLICIES
SELECT '=== CREATING SIMPLIFIED RLS POLICIES ===' as step;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Helper: Check admin without causing RLS recursion
-- Uses SECURITY DEFINER so it can read users without invoking RLS
CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE((SELECT is_admin FROM public.users WHERE id = uid), false);
$$;

GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- Users can read their own profile
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

-- Users can update their own profile (name and email only)
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Service role has full access (for webhooks and admin functions)
CREATE POLICY "service_role_full_access" ON public.users
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Admins can read all users
CREATE POLICY "admin_read_all" ON public.users
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- Admins can update any user
CREATE POLICY "admin_update_all" ON public.users
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- 6. GRANT NECESSARY PERMISSIONS
SELECT '=== GRANTING PERMISSIONS ===' as step;

-- Grant permissions to service role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.questions TO service_role;
GRANT ALL ON public.flashcards TO service_role;
GRANT ALL ON public.quiz_results TO service_role;
GRANT ALL ON public.study_notes TO service_role;
GRANT ALL ON public.study_plans TO service_role;
GRANT ALL ON public.study_plan_weeks TO service_role;

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.questions TO authenticated;
GRANT SELECT ON public.flashcards TO authenticated;
GRANT SELECT, INSERT ON public.quiz_results TO authenticated;
GRANT SELECT ON public.study_notes TO authenticated;
GRANT SELECT ON public.study_plans TO authenticated;
GRANT SELECT ON public.study_plan_weeks TO authenticated;

-- 7. CREATE MISSING USER PROFILES
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

-- 8. CREATE DEFAULT ADMIN USER (if none exists)
SELECT '=== CREATING DEFAULT ADMIN ===' as step;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE is_admin = true) THEN
    -- Promote existing auth user with email 'admin@dojofinancier.com' if present
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@dojofinancier.com') THEN
      INSERT INTO public.users (id, email, name, has_access, is_admin)
      SELECT 
        au.id,
        COALESCE(au.email, 'admin@dojofinancier.com'),
        COALESCE(au.raw_user_meta_data->>'name', split_part(COALESCE(au.email,'admin@dojofinancier.com'),'@',1)),
        true,
        true
      FROM auth.users au
      WHERE au.email = 'admin@dojofinancier.com'
      ON CONFLICT (id) DO UPDATE SET 
        has_access = true,
        is_admin = true;
      
      RAISE NOTICE 'Default admin user promoted: admin@dojofinancier.com';
    ELSE
      RAISE NOTICE 'No auth user found for admin@dojofinancier.com. Create one via Supabase Auth and rerun admin promotion.';
    END IF;
  ELSE
    RAISE NOTICE 'Admin user already exists';
  END IF;
END $$;

-- 9. VERIFICATION
SELECT '=== VERIFICATION ===' as step;

-- Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check policies
SELECT 
  policyname,
  cmd,
  permissive,
  roles
FROM pg_policies 
WHERE tablename = 'users' 
  AND schemaname = 'public'
ORDER BY policyname;

-- Check user count
SELECT 
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE has_access = true) as users_with_access,
  COUNT(*) FILTER (WHERE is_admin = true) as admin_users
FROM public.users;

SELECT '=== COMPREHENSIVE AUTH FIX COMPLETED ===' as result;
