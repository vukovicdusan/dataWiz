# URL Builder — Roadmap

Full design: `docs/superpowers/specs/2026-06-10-url-builder-design.md` · UTM rules: `docs/utm-guide.md`

Branch naming: `ub-{PHASE}-{TASK(S)}` (e.g. `ub-phase1-google-sso`).

## Phase 1 — Supabase setup + login page

- [ ] Create Supabase project; enable Google provider (Google Cloud OAuth client); set env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, service role key for server-only use)
- [ ] Install `@supabase/supabase-js` + `@supabase/ssr`; create browser/server Supabase client helpers in `lib/supabase/`
- [ ] Build `/url-builder` page: site Header nav, big background DataWiz logo top-left, centered "Continue with Google" card
- [ ] `/url-builder/auth/callback` route handler (code → session exchange)
- [ ] Middleware protecting `/url-builder/dashboard` (redirect to `/url-builder` when signed out; signed-in visits to `/url-builder` redirect to dashboard)
- [ ] Placeholder dashboard page proving the auth loop works

## Phase 2 — Database schema + teams

- [ ] SQL migration: `profiles`, `teams`, `team_members` (unique user_id), `invites`, `custom_values`, `generated_urls` + RLS policies
- [ ] First-sign-in bootstrap: create profile, auto-create personal team
- [ ] Dashboard chrome: top-left logo link, top-right dropdown (Google avatar + name) with Invite member / Leave team / Sign out
- [ ] Invite flow: generate copyable link (7-day token, regenerate revokes), `/url-builder/invite/[token]` landing, join-team-on-SSO, switch-team semantics
- [ ] Leave team: confirmation dialog, membership removal, fresh personal team

## Phase 3 — URL builder form

- [ ] `docs/utm-guide.md` data → typed channel templates + default dropdown values in `lib/utm/`
- [ ] Builder UI: base URL field, channel picker (incl. Google Ads GCLID notice), five parameter fields (required/optional split)
- [ ] Warn-only validation: lowercase / no-spaces / no-special-chars warnings; existing `utm_` params warning; internal-link reminder
- [ ] Team custom values: "save to team values" action + values appearing in everyone's dropdowns
- [ ] Generate → Copy button flow; URL assembly + encoding as pure functions; save generated URL to history

## Phase 4 — History + CSV export

- [ ] History accordion: year → month groups, collapsed by default; rows with URL, creator, date, copy button
- [ ] CSV export server route (all team history)
- [ ] Final pass: empty states, loading states, error messages, mobile layout
