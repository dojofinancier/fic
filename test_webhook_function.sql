-- Simple test to verify webhook function logic
-- This simulates what the webhook should do

-- 1. Create a test user if it doesn't exist
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  'test-user-id-123',
  'test@example.com',
  crypt('password', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- 2. Create a test user profile
INSERT INTO public.users (id, email, name, has_access)
VALUES (
  'test-user-id-123',
  'test@example.com',
  'Test User',
  false
) ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  name = EXCLUDED.name;

-- 3. Create a test order
INSERT INTO orders (id, user_id, status, subtotal, total, stripe_payment_intent_id)
VALUES (
  'test-order-id-123',
  'test-user-id-123',
  'pending',
  99.99,
  99.99,
  'pi_test_123'
) ON CONFLICT (id) DO NOTHING;

-- 4. Test the update_user_access function
SELECT update_user_access('test-user-id-123');

-- 5. Verify the user now has access
SELECT 
  id,
  email,
  has_access,
  updated_at
FROM users 
WHERE id = 'test-user-id-123';

-- 6. Clean up test data (optional)
-- DELETE FROM orders WHERE id = 'test-order-id-123';
-- DELETE FROM users WHERE id = 'test-user-id-123';
-- DELETE FROM auth.users WHERE id = 'test-user-id-123';

