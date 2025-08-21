/*
  Fix RLS policies for study content tables
  This migration ensures admin users can properly insert/update/delete study plans and notes
*/

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "study_plans select" ON public.study_plans;
DROP POLICY IF EXISTS "study_plans insert" ON public.study_plans;
DROP POLICY IF EXISTS "study_plans update" ON public.study_plans;
DROP POLICY IF EXISTS "study_plans delete" ON public.study_plans;

DROP POLICY IF EXISTS "study_plan_weeks select" ON public.study_plan_weeks;
DROP POLICY IF EXISTS "study_plan_weeks write" ON public.study_plan_weeks;

DROP POLICY IF EXISTS "study_notes select" ON public.study_notes;
DROP POLICY IF EXISTS "study_notes insert" ON public.study_notes;
DROP POLICY IF EXISTS "study_notes update" ON public.study_notes;
DROP POLICY IF EXISTS "study_notes delete" ON public.study_notes;

-- Create simplified RLS policies for study_plans
CREATE POLICY "study_plans_select_all" ON public.study_plans
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "study_plans_insert_admin" ON public.study_plans
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

CREATE POLICY "study_plans_update_admin" ON public.study_plans
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

CREATE POLICY "study_plans_delete_admin" ON public.study_plans
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

-- Create simplified RLS policies for study_plan_weeks
CREATE POLICY "study_plan_weeks_select_all" ON public.study_plan_weeks
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "study_plan_weeks_insert_admin" ON public.study_plan_weeks
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

CREATE POLICY "study_plan_weeks_update_admin" ON public.study_plan_weeks
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

CREATE POLICY "study_plan_weeks_delete_admin" ON public.study_plan_weeks
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

-- Create simplified RLS policies for study_notes
CREATE POLICY "study_notes_select_all" ON public.study_notes
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "study_notes_insert_admin" ON public.study_notes
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

CREATE POLICY "study_notes_update_admin" ON public.study_notes
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

CREATE POLICY "study_notes_delete_admin" ON public.study_notes
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_plans TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_plan_weeks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_notes TO authenticated;

