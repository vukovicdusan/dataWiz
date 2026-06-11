-- Phase 7: per-team channel customization for the builder dropdown.
-- Teams with ZERO rows here are "uncustomized" and fall back to the
-- hard-coded CHANNELS list in lib/utm/channels.ts. The first mutating
-- action on the Channels page seeds all built-ins. `deleted` is a
-- tombstone: deleted built-ins must not reappear via the merge rule,
-- and tombstoned rows keep their label so History can keep showing a
-- human-readable channel name.

create table public.team_channels (
  id          uuid primary key default gen_random_uuid(),
  team_id     uuid not null references public.teams (id) on delete cascade,
  -- Built-ins use the built-in id ("meta-ads", ...); custom channels use
  -- a generated slug ("custom-<uuid-fragment>"). Written to
  -- generated_urls.channel when a link is saved.
  channel_key text not null,
  label       text not null,
  -- Google Ads only: show the GCLID notice, generate nothing. Copied
  -- from the built-in on seed; always false for custom channels.
  notice_only boolean not null default false,
  is_builtin  boolean not null default false,
  position    integer not null,
  visible     boolean not null default true,
  deleted     boolean not null default false,
  -- Prefill template values; null = no prefill for that param.
  source      text,
  medium      text,
  campaign    text,
  term        text,
  content     text,
  created_at  timestamptz not null default now(),
  unique (team_id, channel_key)
);

alter table public.team_channels enable row level security;

-- Same pattern as base_urls/generated_urls: any team member may read
-- and write their own team's rows.
create policy "members_select_team_channels" on public.team_channels
  for select to authenticated
  using (team_id = public.user_team_id());

create policy "members_insert_team_channels" on public.team_channels
  for insert to authenticated
  with check (team_id = public.user_team_id());

create policy "members_update_team_channels" on public.team_channels
  for update to authenticated
  using (team_id = public.user_team_id())
  with check (team_id = public.user_team_id());

create policy "members_delete_team_channels" on public.team_channels
  for delete to authenticated
  using (team_id = public.user_team_id());
