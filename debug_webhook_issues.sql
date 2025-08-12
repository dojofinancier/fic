-- Comprehensive Webhook Issue Diagnosis
-- Run this in Supabase SQL Editor to identify the exact problem

-- 1. Check if users table exists and has correct structure
SELECT '=== USERS TABLE DIAGNOSIS ===' as section;
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check RLS policies on users table
SELECT '=== RLS POLICIES DIAGNOSIS ===' as section;
SELECT 
  policyname,
  cmd,
  permissive,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- 3. Check if update_user_access function exists
SELECT '=== RPC FUNCTION DIAGNOSIS ===' as section;
SELECT 
  routine_name,
  routine_type,
  security_type
FROM information_schema.routines 
WHERE routine_name = 'update_user_access'
  AND routine_schema = 'public';

-- 4. Check recent orders and their status
SELECT '=== RECENT ORDERS DIAGNOSIS ===' as section;
SELECT 
  id,
  user_id,
  status,
  stripe_payment_intent_id,
  created_at
FROM orders 
ORDER BY created_at DESC 
LIMIT 10;

-- 5. Check if users exist for recent orders
SELECT '=== USER EXISTENCE DIAGNOSIS ===' as section;
SELECT 
  o.id as order_id,
  o.user_id,
  o.status,
  u.id as user_exists,
  u.has_access,
  u.email
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC 
LIMIT 10;

-- 6. Check auth.users vs public.users
SELECT '=== AUTH VS PUBLIC USERS DIAGNOSIS ===' as section;
SELECT 
  au.id as auth_user_id,
  au.email as auth_email,
  pu.id as public_user_id,
  pu.has_access,
  pu.email as public_email
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC 
LIMIT 10;

-- 7. Check payments table
SELECT '=== PAYMENTS DIAGNOSIS ===' as section;
SELECT 
  id,
  order_id,
  stripe_payment_intent_id,
  amount,
  status,
  created_at
FROM payments 
ORDER BY created_at DESC 
LIMIT 10;

-- 8. Test the update_user_access function manually
SELECT '=== MANUAL FUNCTION TEST ===' as section;
-- This will only work if you have a valid user_id to test with
-- SELECT update_user_access('your-test-user-id-here');

-- 9. Check for any database errors in logs
SELECT '=== ERROR LOG DIAGNOSIS ===' as section;
-- Note: This might not be available in all Supabase plans
-- SELECT * FROM pg_stat_activity WHERE state = 'active';

-- 10. Check table row counts
SELECT '=== TABLE ROW COUNTS ===' as section;
SELECT 
  'users' as table_name,
  COUNT(*) as row_count
FROM users
UNION ALL
SELECT 
  'orders' as table_name,
  COUNT(*) as row_count
FROM orders
UNION ALL
SELECT 
  'payments' as table_name,
  COUNT(*) as row_count
FROM payments;
