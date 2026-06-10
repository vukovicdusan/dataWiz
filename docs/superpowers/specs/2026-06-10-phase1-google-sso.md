# Phase 1 — Supabase Setup + Google SSO Login

Date: 2026-06-10
Status: Approved by user
Parent spec: `docs/superpowers/specs/2026-06-10-url-builder-design.md` · Roadmap: `roadmap.md`

## Background

The URL Builder lives inside the existing DataWiz Next.js 14 marketing site. Phase 1 lays the
authentication foundation: a public login page at `/url-builder`, Google sign-in through Supabase
Auth, and a protected placeholder dashboard proving the full auth loop. No database tables, teams,
or builder UI yet (Phases 2–4).

The user has no Supabase project or Google Cloud OAuth client yet; the plan must include
click-by-click setup instructions as explicit human-only steps.

## Goal

A working sign-in loop: visit `/url-builder` → "Continue with Google" → Google consent →
`/url-builder/dashboard` (shows the signed-in user's name/email) → Sign out → locked out of the
dashboard again.

## In scope

- Supabase project + Google Cloud OAuth client setup (human-only, with full instructions).
- `.env.local` entries: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` (server-only; unused until Phase 2 but captured during setup).
- Install `@supabase/supabase-js` + `@supabase/ssr`.
- `lib/supabase/` client helpers: browser client, server client (cookie-based sessions),
  middleware helper.
- `/url-builder` login page: existing site `Header`, centered card with a "Continue with
  Google" button. (A faded background logo was in the original design; removed at user
  request after the smoke test.)
- `/url-builder/auth/callback` route handler: exchanges the OAuth code for a session, then
  redirects to the dashboard.
- Next.js middleware scoped to `/url-builder/:path*`:
  - signed-out visit to `/url-builder/dashboard` → redirect to `/url-builder`;
  - signed-in visit to `/url-builder` → redirect to `/url-builder/dashboard`.
  The rest of the marketing site is never touched by the middleware.
- Placeholder dashboard: shows Google name + email and a working Sign out button.

## Out of scope (later phases)

- Database schema, RLS, profiles, teams, invites (Phase 2).
- Dashboard chrome (logo link, avatar dropdown) — placeholder only.
- Builder form, history, CSV (Phases 3–4).
- Production/live-site OAuth configuration: Phase 1 is verified on `http://localhost:3000` only.
  Production redirect URLs are a small follow-up at deploy time.

## Key decisions

| Decision | Choice | Trade-off |
|---|---|---|
| Session handling | Cookie-based via `@supabase/ssr` (browser + server clients) | Slightly more setup than client-only auth, but middleware and server routes can read the session — required for real route protection (decided in parent spec) |
| Sign-in trigger | Client component calling `supabase.auth.signInWithOAuth({ provider: "google" })` with `redirectTo` → `/url-builder/auth/callback` | Simplest supported flow; a server-action variant adds complexity with no benefit here |
| Middleware scope | `matcher: ["/url-builder/:path*"]` | Keeps auth checks off the marketing site entirely; zero risk of regressing existing pages |
| Placeholder dashboard contents | User's name/email + Sign out button | Minimal, but enough to verify the whole loop including sign-out (vs. a bare "you're in" page, which can't prove sign-out works) |
| Env file | `.env.local` (gitignored) | Standard Next.js convention; secrets never committed |

## Acceptance criteria

1. Signed out, `/url-builder` renders: site header and a centered "Continue with Google" card.
2. Clicking the button completes Google sign-in and lands on `/url-builder/dashboard`, which
   shows the user's Google name and email.
3. Signed out, visiting `/url-builder/dashboard` directly redirects to `/url-builder`.
4. Signed in, visiting `/url-builder` redirects to `/url-builder/dashboard`.
5. Sign out returns to `/url-builder`; the dashboard is locked again.
6. `npm run build` and `npm run lint` pass.
7. No change in behavior anywhere else on the marketing site.
8. Human-only steps (Supabase project, Google OAuth client, `.env.local`) are documented as an
   explicit checklist; the app fails with a clear message if env vars are missing.
