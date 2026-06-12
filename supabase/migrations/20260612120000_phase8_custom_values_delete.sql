-- Phase 8: let team members delete their team's saved values.
-- Any member may delete any of the team's rows (same decision as the
-- Phase 6 generated_urls policy: saved values are team-shared, and
-- creator-only delete would leave typos nobody else can clean up).
-- Deletes targeting another team's rows are silent no-ops under RLS.

create policy "members_delete_team_custom_values"
  on public.custom_values for delete to authenticated
  using (team_id = public.user_team_id());
