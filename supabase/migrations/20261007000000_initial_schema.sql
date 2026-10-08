-- PushNPull initial schema
-- Safe to run more than once, and safe to run on a project where `profiles`
-- and `workout_sessions` were already created in the dashboard: it only adds
-- what's missing.
--
-- How to apply: Supabase dashboard → SQL Editor → paste this file → Run.
-- Then run supabase/seed.sql the same way.

-- ---------------------------------------------------------------------------
-- Workout catalog (maintained by the dev team, read-only for users)
-- ---------------------------------------------------------------------------

create table if not exists public.exercises (
  id            text primary key,              -- slug, e.g. 'goblet_squat'
  name          text not null,
  muscle_group  text not null
                check (muscle_group in ('chest', 'back', 'legs', 'glutes', 'shoulders', 'arms', 'core')),
  equipment     text not null
                check (equipment in ('machines', 'dumbbells', 'cables', 'bodyweight')),
  is_compound   boolean not null default false, -- works several joints (squat, press, row)
  sets          int not null default 3,
  reps          text not null default '8-12',   -- text so we can say '20-40 sec' or '8 each side'
  rest_seconds  int not null default 90,
  form_cue      text not null
);

create table if not exists public.routines (
  id             text primary key,             -- slug, e.g. 'full_body_3'
  name           text not null,
  description    text not null,
  days_per_week  int not null
);

create table if not exists public.routine_days (
  routine_id  text not null references public.routines (id) on delete cascade,
  day_number  int  not null,
  label       text not null,                   -- 'Workout A', 'Push', 'Upper' ...
  primary key (routine_id, day_number)
);

create table if not exists public.routine_exercises (
  routine_id   text not null,
  day_number   int  not null,
  position     int  not null,                  -- order shown in the step-by-step view
  exercise_id  text not null references public.exercises (id),
  primary key (routine_id, day_number, position),
  foreign key (routine_id, day_number)
    references public.routine_days (routine_id, day_number) on delete cascade
);

-- ---------------------------------------------------------------------------
-- User data
-- ---------------------------------------------------------------------------

-- One row per signed-up user. id = the Supabase Auth user id.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);

alter table public.profiles
  add column if not exists display_name   text,
  add column if not exists goal           text,
  add column if not exists experience     text,
  add column if not exists days_per_week  int,
  add column if not exists equipment      text[] not null default '{}',
  add column if not exists routine_id     text,
  add column if not exists onboarded_at   timestamptz;

alter table public.profiles drop constraint if exists profiles_goal_check;
alter table public.profiles add constraint profiles_goal_check
  check (goal is null or goal in ('build_muscle', 'get_stronger', 'lose_fat', 'general_fitness'));

alter table public.profiles drop constraint if exists profiles_experience_check;
alter table public.profiles add constraint profiles_experience_check
  check (experience is null or experience in ('new', 'some'));

alter table public.profiles drop constraint if exists profiles_days_per_week_check;
alter table public.profiles add constraint profiles_days_per_week_check
  check (days_per_week is null or days_per_week between 2 and 6);

alter table public.profiles drop constraint if exists profiles_routine_id_fkey;
alter table public.profiles add constraint profiles_routine_id_fkey
  foreign key (routine_id) references public.routines (id);

-- One row per gym visit. Logging individual sets is left for the next group
-- (suggested: a `session_sets` table pointing at workout_sessions + exercises).
create table if not exists public.workout_sessions (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles (id) on delete cascade,
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  notes       text
);

-- ---------------------------------------------------------------------------
-- Row Level Security: each user can only see and change their own rows.
-- ---------------------------------------------------------------------------

alter table public.profiles          enable row level security;
alter table public.workout_sessions  enable row level security;
alter table public.exercises         enable row level security;
alter table public.routines          enable row level security;
alter table public.routine_days      enable row level security;
alter table public.routine_exercises enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "Users manage their own sessions" on public.workout_sessions;
create policy "Users manage their own sessions" on public.workout_sessions
  for all to authenticated
  using ((select auth.uid()) = profile_id) with check ((select auth.uid()) = profile_id);

-- Catalog tables: any signed-in user can read; only the dashboard can edit.
drop policy if exists "Signed-in users can read exercises" on public.exercises;
create policy "Signed-in users can read exercises" on public.exercises
  for select to authenticated using (true);

drop policy if exists "Signed-in users can read routines" on public.routines;
create policy "Signed-in users can read routines" on public.routines
  for select to authenticated using (true);

drop policy if exists "Signed-in users can read routine days" on public.routine_days;
create policy "Signed-in users can read routine days" on public.routine_days
  for select to authenticated using (true);

drop policy if exists "Signed-in users can read routine exercises" on public.routine_exercises;
create policy "Signed-in users can read routine exercises" on public.routine_exercises
  for select to authenticated using (true);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.workout_sessions to authenticated;
grant select on public.exercises, public.routines, public.routine_days, public.routine_exercises to authenticated;
