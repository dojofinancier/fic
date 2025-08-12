-- Add RPC function to update user access
-- This function bypasses RLS for webhook processing

CREATE OR REPLACE FUNCTION update_user_access(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users 
  SET has_access = true, updated_at = now()
  WHERE id = user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_user_access(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_access(uuid) TO service_role;

-- Verify the function is created
SELECT 'update_user_access function created' as result;
