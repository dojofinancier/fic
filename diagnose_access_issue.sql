-- Comprehensive diagnosis of user access issues
-- Run this to identify why users aren't getting access after payment

-- 1. Check if the handle_new_user trigger exists
SELECT '=== TRIGGER CHECK ===' as section;
SELECT 
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created'
  AND event_object_schema = 'auth'
  AND event_object_table = 'users';

-- 2. Check current RLS policies on users table
SELECT '=== RLS POLICIES ===' as section;
SELECT 
  policyname,
  cmd,
  permissive,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public'
ORDER BY policyname;

-- 3. Check if users table has the right structure
SELECT '=== USERS TABLE STRUCTURE ===' as section;
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Check recent auth.users vs public.users
SELECT '=== AUTH VS PUBLIC USERS ===' as section;
SELECT 
  au.id as auth_user_id,
  au.email as auth_email,
  au.created_at as auth_created,
  pu.id as public_user_id,
  pu.has_access,
  pu.created_at as public_created
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC 
LIMIT 10;

-- 5. Check recent orders and their status
SELECT '=== RECENT ORDERS ===' as section;
SELECT 
  id,
  user_id,
  status,
  stripe_payment_intent_id,
  created_at
FROM orders 
ORDER BY created_at DESC 
LIMIT 5;

-- 6. Check payments table
SELECT '=== PAYMENTS ===' as section;
SELECT 
  id,
  order_id,
  stripe_payment_intent_id,
  amount,
  status,
  created_at
FROM payments 
ORDER BY created_at DESC 
LIMIT 5;

-- 7. Check specific user's complete status (replace email)
SELECT '=== SPECIFIC USER STATUS ===' as section;
-- Replace 'test@example.com' with the email you used for testing
SELECT 
  u.id,
  u.email,
  u.has_access,
  u.created_at,
  o.id as order_id,
  o.status as order_status,
  o.stripe_payment_intent_id,
  p.id as payment_id,
  p.amount as payment_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN payments p ON o.id = p.order_id
WHERE u.email = 'test@example.com'  -- Change this to your test email
ORDER BY o.created_at DESC;

-- 8. Check if there are any users without profiles
SELECT '=== USERS WITHOUT PROFILES ===' as section;
SELECT 
  au.id,
  au.email,
  au.created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ORDER BY au.created_at DESC;
