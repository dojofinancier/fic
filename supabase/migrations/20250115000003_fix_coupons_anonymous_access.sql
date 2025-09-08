/*
  Fix RLS policies for coupons table to allow anonymous access
  This allows users to validate coupons during checkout before authentication
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "coupons_select_all" ON public.coupons;

-- Create a new policy that allows anonymous users to read coupons
CREATE POLICY "coupons_select_public" ON public.coupons
  FOR SELECT TO anon, authenticated
  USING (true);

-- Verify the policy was created
SELECT 
  policyname,
  cmd,
  permissive,
  roles
FROM pg_policies 
WHERE tablename = 'coupons' 
  AND schemaname = 'public'
ORDER BY policyname;
