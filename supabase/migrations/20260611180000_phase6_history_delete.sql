-- Phase 6: let team members delete their team's generated URLs.
-- Any member may delete any of the team's rows (decision: matches the
-- team's shared read access; creator-only delete would leave orphaned
-- rows nobody can clean up). Deletes targeting another team's rows are
-- silent no-ops under RLS; the server action reports them as failures
-- by counting deleted rows.

create policy "members_delete_team_generated_urls"
  on public.generated_urls for delete to authenticated
  using (team_id = public.user_team_id());
