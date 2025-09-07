/*
  # Fix RLS policies for webhook_logs table

  This migration adds the missing service role policies to allow
  Edge Functions to insert webhook logs.
*/

-- Add policies for service role to insert and read webhook logs
-- (Only create if they don't already exist)
DO $$
BEGIN
    -- Add service role insert policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'webhook_logs' 
        AND policyname = 'webhook_logs_service_role_insert'
    ) THEN
        CREATE POLICY "webhook_logs_service_role_insert" ON webhook_logs
        FOR INSERT TO service_role
        WITH CHECK (true);
    END IF;

    -- Add service role read policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'webhook_logs' 
        AND policyname = 'webhook_logs_service_role_read'
    ) THEN
        CREATE POLICY "webhook_logs_service_role_read" ON webhook_logs
        FOR SELECT TO service_role
        USING (true);
    END IF;
END $$;
