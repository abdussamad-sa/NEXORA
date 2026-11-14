-- Supabase schema for NEXORA application

-- Enable pgcrypto for UUID generation
create extension if not exists pgcrypto;

-- 1. Profiles (one-to-one with auth.users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  education text,
  role text,
  career_goal text,
  created_at timestamp default now()
);

-- 2. Projects
create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  description text,
  deadline date,
  status text check (status in ('active','completed','archived')) default 'active',
  created_at timestamp default now()
);

-- 3. Tasks
create table tasks (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects on delete cascade,
  user_id uuid references auth.users on delete cascade,
  title text not null,
  description text,
  priority int check (priority between 1 and 5) default 3,
  deadline date,
  completed boolean default false,
  created_at timestamp default now()
);

-- 4. Skills
create table skills (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  level int check (level between 0 and 100) default 0,
  updated_at timestamp default now()
);

-- 5. Activities (audit log)
create table activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  type text,
  description text,
  created_at timestamp default now()
);

-- RLS Policies
-- Profiles
alter table profiles enable row level security;
create policy "allow own profile" on profiles for all using (auth.uid() = id);
create policy "allow insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "allow update own profile" on profiles for update using (auth.uid() = id);
create policy "allow delete own profile" on profiles for delete using (auth.uid() = id);

-- Projects
alter table projects enable row level security;
create policy "allow own projects" on projects for all using (auth.uid() = user_id);
create policy "allow insert own project" on projects for insert with check (auth.uid() = user_id);
create policy "allow update own project" on projects for update using (auth.uid() = user_id);
create policy "allow delete own project" on projects for delete using (auth.uid() = user_id);

-- Tasks
alter table tasks enable row level security;
create policy "allow own tasks" on tasks for all using (auth.uid() = user_id);
create policy "allow insert own task" on tasks for insert with check (auth.uid() = user_id);
create policy "allow update own task" on tasks for update using (auth.uid() = user_id);
create policy "allow delete own task" on tasks for delete using (auth.uid() = user_id);

-- Skills
alter table skills enable row level security;
create policy "allow own skills" on skills for all using (auth.uid() = user_id);
create policy "allow insert own skill" on skills for insert with check (auth.uid() = user_id);
create policy "allow update own skill" on skills for update using (auth.uid() = user_id);
create policy "allow delete own skill" on skills for delete using (auth.uid() = user_id);

-- Activities
alter table activities enable row level security;
create policy "allow own activities" on activities for all using (auth.uid() = user_id);
create policy "allow insert own activity" on activities for insert with check (auth.uid() = user_id);
