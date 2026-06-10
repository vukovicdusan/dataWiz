# URL Builder — Deploy & Go-Live Checklist

Two separate switches, two separate decisions:

- **Deploying** (merging to `main` → Vercel builds the site) makes the code live. Safe to do
  per phase: the marketing site is unaffected, and `/url-builder` is not linked from the site
  navigation.
- **Public availability** is controlled by the Google consent screen. While it is in
  **Testing** mode, only listed test users can sign in — everyone else is locked out even on
  the live site. Clicking **Publish app** is the real launch switch.

## One-time production setup (before the first deploy of /url-builder)

- [ ] **Vercel** → project → Settings → Environment Variables — add all four, same names and
  values as in the local `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL` (public by design)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public by design — protected by row-level security)
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (public by design — restricted to authorized origins)
  - `SUPABASE_SERVICE_ROLE_KEY` (secret; Vercel stores it encrypted, server-only)
- [ ] **Supabase** → Authentication → URL Configuration:
  - Site URL: `https://datawizanalytics.com`
  - Add redirect URL: `https://datawizanalytics.com/url-builder/auth/callback`
  - Keep the `http://localhost:3000` entries so local development keeps working.
- [ ] **Google Cloud** → APIs & Services → Credentials → "DataWiz URL Builder Web" →
  Authorized JavaScript origins → add `https://datawizanalytics.com`.
- [ ] Redeploy on Vercel after adding the env vars (they apply on the next build).
- [ ] Smoke test on the live URL: sign in (as a listed test user), see the dashboard,
  sign out, confirm `/url-builder/dashboard` is locked when signed out.

## Public launch (when the builder is actually useful — after Phase 3 or 4)

- [ ] Google Cloud → OAuth consent screen → **Publish app** (moves from Testing to
  Production; no Google review needed for basic sign-in scopes).
- [ ] Optional, cosmetic: Supabase **custom domain** add-on (~$10/month) so any Google
  consent UI that mentions a domain shows something like `api.datawizanalytics.com`
  instead of `dgigfivapfhgnbyucxfd.supabase.co`.
- [ ] Decide where to link the URL Builder from the site (it is unlinked until then).

## Per-phase reminders

- New env vars introduced in a later phase must be added to Vercel as well as `.env.local`.
- Database changes (Phase 2+) are applied in Supabase before merging the code that uses them.
- The Google app stays in Testing mode until the public-launch checklist above.
