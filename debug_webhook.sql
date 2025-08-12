-- Debug script to check webhook processing
-- Run this after a successful payment to see what's happening

-- 1. Check recent orders and their status
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

-- 2. Check if users have access
SELECT '=== USER ACCESS STATUS ===' as section;
SELECT 
  u.id,
  u.email,
  u.has_access,
  u.created_at
FROM users u
ORDER BY u.created_at DESC 
LIMIT 5;

-- 3. Check payments table
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

-- 4. Check specific user's complete status
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
