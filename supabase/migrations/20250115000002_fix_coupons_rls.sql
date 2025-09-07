/*
  Fix RLS policies and permissions for coupons table
  This migration ensures admin users can properly manage coupons
*/

-- Grant necessary permissions to authenticated users for coupons table
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupons TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;

-- Grant permissions to service role
GRANT ALL ON public.coupons TO service_role;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.payments TO service_role;

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "coupons_read_all" ON public.coupons;
DROP POLICY IF EXISTS "coupons_admin_manage" ON public.coupons;

-- Create new RLS policies for coupons
CREATE POLICY "coupons_select_all" ON public.coupons
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "coupons_insert_admin" ON public.coupons
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

CREATE POLICY "coupons_update_admin" ON public.coupons
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

CREATE POLICY "coupons_delete_admin" ON public.coupons
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

-- Service role has full access to coupons
CREATE POLICY "coupons_service_role_full_access" ON public.coupons
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Verify the policies were created
SELECT 
  policyname,
  cmd,
  permissive,
  roles
FROM pg_policies 
WHERE tablename = 'coupons' 
  AND schemaname = 'public'
ORDER BY policyname;

