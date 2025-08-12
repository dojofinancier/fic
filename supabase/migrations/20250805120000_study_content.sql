/*
  Study content: notes and plans, plus Storage bucket and RLS
*/

-- Create Storage bucket (public read)
insert into storage.buckets (id, name, public)
values ('study-assets', 'study-assets', true)
on conflict (id) do nothing;

-- Public read policy for study-assets
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'study-assets public read'
  ) then
    create policy "study-assets public read" on storage.objects
      for select using (bucket_id = 'study-assets');
  end if;
end $$;

-- Authenticated write policies for study-assets
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'study-assets auth write insert'
  ) then
    create policy "study-assets auth write insert" on storage.objects
      for insert to authenticated
      with check (bucket_id = 'study-assets');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'study-assets auth write update'
  ) then
    create policy "study-assets auth write update" on storage.objects
      for update to authenticated
      using (bucket_id = 'study-assets')
      with check (bucket_id = 'study-assets');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'study-assets auth write delete'
  ) then
    create policy "study-assets auth write delete" on storage.objects
      for delete to authenticated
      using (bucket_id = 'study-assets');
  end if;
end $$;

-- Tables for study notes
create table if not exists public.study_notes (
  id uuid primary key default gen_random_uuid(),
  chapter int not null check (chapter between 1 and 18),
  title text not null,
  sections jsonb not null default '[]'::jsonb, -- [{title, points: [text]}]
  pdf_path text, -- storage path under study-assets
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (chapter)
);

alter table public.study_notes enable row level security;

-- RLS: everyone authenticated can read; only admins can write
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_notes' and policyname='study_notes select'
  ) then
    create policy "study_notes select" on public.study_notes
      for select to authenticated using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_notes' and policyname='study_notes insert'
  ) then
    create policy "study_notes insert" on public.study_notes
      for insert to authenticated
      with check (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true));
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_notes' and policyname='study_notes update'
  ) then
    create policy "study_notes update" on public.study_notes
      for update to authenticated
      using (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true))
      with check (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true));
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_notes' and policyname='study_notes delete'
  ) then
    create policy "study_notes delete" on public.study_notes
      for delete to authenticated
      using (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true));
  end if;
end $$;

-- Tables for study plans
create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  weeks int not null check (weeks in (6,8,12)),
  title text not null,
  description text,
  total_hours text,
  daily_commitment text,
  pdf_path text, -- storage path
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (weeks)
);

create table if not exists public.study_plan_weeks (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.study_plans(id) on delete cascade,
  week_number int not null,
  chapters text not null,
  focus text,
  hours text,
  tasks text[] not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (plan_id, week_number)
);

alter table public.study_plans enable row level security;
alter table public.study_plan_weeks enable row level security;

-- RLS for plans: select to authenticated; write only admins
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_plans' and policyname='study_plans select'
  ) then
    create policy "study_plans select" on public.study_plans
      for select to authenticated using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_plans' and policyname='study_plans insert'
  ) then
    create policy "study_plans insert" on public.study_plans
      for insert to authenticated
      with check (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true));
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_plans' and policyname='study_plans update'
  ) then
    create policy "study_plans update" on public.study_plans
      for update to authenticated
      using (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true))
      with check (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true));
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_plans' and policyname='study_plans delete'
  ) then
    create policy "study_plans delete" on public.study_plans
      for delete to authenticated
      using (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_plan_weeks' and policyname='study_plan_weeks select'
  ) then
    create policy "study_plan_weeks select" on public.study_plan_weeks
      for select to authenticated using (
        exists (select 1 from public.study_plans p where p.id = study_plan_weeks.plan_id)
      );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='study_plan_weeks' and policyname='study_plan_weeks write'
  ) then
    create policy "study_plan_weeks write" on public.study_plan_weeks
      for all to authenticated
      using (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true))
      with check (exists (select 1 from public.users u where u.id = auth.uid() and coalesce(u.is_admin, false) = true));
  end if;
end $$;

-- Indexes
create index if not exists study_notes_chapter_idx on public.study_notes (chapter);
create index if not exists study_plan_weeks_plan_id_idx on public.study_plan_weeks (plan_id);


