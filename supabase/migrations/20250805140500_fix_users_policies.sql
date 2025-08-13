/*
  Ensure authenticated users can select their own user row and admins can manage
*/

alter table if exists public.users enable row level security;

do $$
begin
  -- Select own row (and allow admin visibility if desired)
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='users' and policyname='users select own'
  ) then
    create policy "users select own" on public.users
      for select to authenticated
      using (id = auth.uid() or coalesce(is_admin,false) = true);
  end if;

  -- Insert self
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='users' and policyname='users insert self'
  ) then
    create policy "users insert self" on public.users
      for insert to authenticated
      with check (id = auth.uid());
  end if;

  -- Update own (or admin)
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='users' and policyname='users update own or admin'
  ) then
    create policy "users update own or admin" on public.users
      for update to authenticated
      using (id = auth.uid() or coalesce(is_admin,false) = true)
      with check (id = auth.uid() or coalesce(is_admin,false) = true);
  end if;
end $$;


