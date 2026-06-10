-- Phase 2: URL Builder schema — profiles, teams, team_members, invites,
-- custom_values, generated_urls. RLS on every table.
--
-- Policy model:
--   * authenticated members may SELECT rows of their own team
--     (profiles: own row + fellow team members' rows)
--   * custom_values / generated_urls also allow member INSERT (for Phase 3)
--   * NO client insert/update/delete on team mechanics — those run through
--     server actions using the service role (which bypasses RLS)

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------

create type public.utm_param as enum
  ('source', 'medium', 'campaign', 'term', 'content');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.teams (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  created_at timestamptz not null default now()
);

-- One team per user, enforced by the primary key on user_id.
create table public.team_members (
  user_id   uuid primary key references public.profiles (id) on delete cascade,
  team_id   uuid not null references public.teams (id) on delete cascade,
  joined_at timestamptz not null default now()
);

create index team_members_team_id_idx on public.team_members (team_id);

create table public.invites (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams (id) on delete cascade,
  token      text not null unique,
  created_by uuid references public.profiles (id) on delete set null,
  expires_at timestamptz not null,
  revoked    boolean not null default false,
  created_at timestamptz not null default now()
);

create index invites_team_id_idx on public.invites (team_id);

-- Single active (non-revoked) link per team, enforced by the database.
-- Server code always revokes existing links before inserting a new one.
create unique index invites_one_active_per_team_idx
  on public.invites (team_id)
  where not revoked;

create table public.custom_values (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams (id) on delete cascade,
  param      public.utm_param not null,
  value      text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (team_id, param, value)
);

create index custom_values_team_id_idx on public.custom_values (team_id);

create table public.generated_urls (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams (id) on delete cascade,
  created_by uuid references public.profiles (id) on delete set null,
  base_url   text not null,
  source     text not null,
  medium     text not null,
  campaign   text not null,
  term       text,
  content    text,
  full_url   text not null,
  created_at timestamptz not null default now()
);

create index generated_urls_team_created_idx
  on public.generated_urls (team_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS helper
-- ---------------------------------------------------------------------------

-- Returns the calling user's team id. SECURITY DEFINER so policies on
-- team_members itself can use it without recursive RLS evaluation.
create or replace function public.user_team_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select team_id from public.team_members where user_id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.profiles       enable row level security;
alter table public.teams          enable row level security;
alter table public.team_members   enable row level security;
alter table public.invites        enable row level security;
alter table public.custom_values  enable row level security;
alter table public.generated_urls enable row level security;

create policy "members_select_team_profiles"
  on public.profiles for select to authenticated
  using (
    id = (select auth.uid())
    or id in (
      select user_id from public.team_members
      where team_id = public.user_team_id()
    )
  );

create policy "members_select_own_team"
  on public.teams for select to authenticated
  using (id = public.user_team_id());

create policy "members_select_team_members"
  on public.team_members for select to authenticated
  using (team_id = public.user_team_id());

create policy "members_select_team_invites"
  on public.invites for select to authenticated
  using (team_id = public.user_team_id());

create policy "members_select_team_custom_values"
  on public.custom_values for select to authenticated
  using (team_id = public.user_team_id());

create policy "members_insert_team_custom_values"
  on public.custom_values for insert to authenticated
  with check (
    team_id = public.user_team_id()
    and created_by = (select auth.uid())
  );

create policy "members_select_team_generated_urls"
  on public.generated_urls for select to authenticated
  using (team_id = public.user_team_id());

create policy "members_insert_team_generated_urls"
  on public.generated_urls for insert to authenticated
  with check (
    team_id = public.user_team_id()
    and created_by = (select auth.uid())
  );
