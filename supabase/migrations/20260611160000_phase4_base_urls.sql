-- Team-shared saved base URLs for the builder. Separate table instead of
-- widening the utm_param enum: base URLs are not UTM parameters and the
-- existing custom_values grouping code is typed Record<UtmParam, string[]>.
create table public.base_urls (
  id         uuid primary key default gen_random_uuid(),
  team_id    uuid not null references public.teams (id) on delete cascade,
  value      text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (team_id, value)
);

alter table public.base_urls enable row level security;

create policy "members_select_team_base_urls" on public.base_urls
  for select to authenticated
  using (team_id = public.user_team_id());

create policy "members_insert_team_base_urls" on public.base_urls
  for insert to authenticated
  with check (
    team_id = public.user_team_id()
    and created_by = (select auth.uid())
  );
