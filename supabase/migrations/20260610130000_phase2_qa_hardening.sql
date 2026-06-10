-- QA hardening: atomic empty-team cleanup. Replaces the app-side
-- count-then-delete (TOCTOU: a member joining between the count and the
-- delete would be cascaded away). Service-role-only via RPC.

create or replace function public.delete_team_if_empty(target_team_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.teams t
  where t.id = target_team_id
    and not exists (
      select 1 from public.team_members m where m.team_id = target_team_id
    );
$$;

revoke execute on function public.delete_team_if_empty(uuid)
  from public, anon, authenticated;
grant execute on function public.delete_team_if_empty(uuid) to service_role;
