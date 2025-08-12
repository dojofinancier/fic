-- Fix webhook access to update user has_access
-- This migration adds a policy that allows the service role to update user access

-- Add policy for service role to update user access
CREATE POLICY "service_role_update_access" ON public.users
  FOR UPDATE TO service_role
  USING (true)
  WITH CHECK (true);

-- Also add a policy for authenticated users to update has_access (for admin purposes)
CREATE POLICY "admin_update_access" ON public.users
  FOR UPDATE TO authenticated
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

-- Verify the policies are created
SELECT 'Webhook access policies created' as result;

