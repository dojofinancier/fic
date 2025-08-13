/*
  Enable RLS and add basic policies for questions and flashcards
*/

-- Questions
alter table if exists public.questions enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='questions' and policyname='questions select'
  ) then
    create policy "questions select" on public.questions for select to authenticated using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='questions' and policyname='questions insert'
  ) then
    create policy "questions insert" on public.questions for insert to authenticated with check (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='questions' and policyname='questions update'
  ) then
    create policy "questions update" on public.questions for update to authenticated using (true) with check (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='questions' and policyname='questions delete'
  ) then
    create policy "questions delete" on public.questions for delete to authenticated using (true);
  end if;
end $$;

-- Flashcards
alter table if exists public.flashcards enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='flashcards' and policyname='flashcards select'
  ) then
    create policy "flashcards select" on public.flashcards for select to authenticated using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='flashcards' and policyname='flashcards insert'
  ) then
    create policy "flashcards insert" on public.flashcards for insert to authenticated with check (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='flashcards' and policyname='flashcards update'
  ) then
    create policy "flashcards update" on public.flashcards for update to authenticated using (true) with check (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='flashcards' and policyname='flashcards delete'
  ) then
    create policy "flashcards delete" on public.flashcards for delete to authenticated using (true);
  end if;
end $$;


