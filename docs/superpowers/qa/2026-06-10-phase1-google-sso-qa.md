# QA — Phase 1: Supabase Setup + Google SSO Login

**Verdict: Code complete and build-clean; ship-readiness pending human setup (plan Tasks 7–11) + browser smoke test (Task 12).**

Branch `ub-phase1-google-sso`, range `f5cb201..c636690`. Verified 2026-06-10 with no `.env.local` present.

## Human steps remaining

- [ ] Task 7 — Create the free Supabase project; copy the Google **Callback URL**.
- [ ] Task 8 — Create the Google Cloud project, consent screen (External + yourself as test user), and a Web application OAuth client with the Supabase callback URL as redirect URI; copy Client ID + secret.
- [ ] Task 9 — Enable the **Google** provider in Supabase and paste the Client ID + secret.
- [ ] Task 10 — Supabase URL Configuration: Site URL `http://localhost:3000`, redirect URL `http://localhost:3000/url-builder/auth/callback`.
- [ ] Task 11 — Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`; restart the dev server.
- [ ] Task 12 — Browser smoke test of the full sign-in → dashboard → sign-out loop (acceptance criteria 1–5).

## BLOCKERS

None.

## SHOULD-FIX

None.

## NITS

1. **Sign-in button can stay stuck on "Redirecting to Google..." after browser Back.** `components/url-builder/GoogleSignInButton.tsx:11` sets `isSigningIn` before the OAuth redirect and never resets it on success; if the user clicks Back from the Google consent screen and the page is restored from bfcache, the button remains disabled until a reload. Suggested fix: add a `pageshow` listener (or reset state in a `useEffect`) to clear `isSigningIn` when the page is restored.
2. **Awkward greeting fallback.** `app/url-builder/dashboard/page.tsx:22-23` falls back to `"there"`, rendering "Welcome, there!" when Google provides no `full_name`. Suggested fix: fall back to the email local-part or render just "Welcome!".

## Acceptance criteria status

| # | Criterion | Status |
|---|---|---|
| 1 | Signed out, `/url-builder` renders header, faded top-left logo, centered Google card | Code-verified (`app/url-builder/page.tsx`; Header/Footer from root layout; `full-logo-blue.png` exists, `opacity-10` top-left) — pending human smoke test |
| 2 | Google sign-in lands on dashboard showing name + email | Code-verified (`GoogleSignInButton.tsx` → `auth/callback/route.ts` → `dashboard/page.tsx`) — pending human smoke test |
| 3 | Signed out, `/url-builder/dashboard` redirects to `/url-builder` | Code-verified (`lib/supabase/middleware.ts:66-71` + page-level `redirect()` at `dashboard/page.tsx:18-20`) — pending human smoke test |
| 4 | Signed in, `/url-builder` redirects to dashboard | Code-verified (`lib/supabase/middleware.ts:74-79`) — pending human smoke test |
| 5 | Sign out returns to `/url-builder`; dashboard locked again | Code-verified (`SignOutButton.tsx`; middleware is the safety net) — pending human smoke test |
| 6 | `npm run build` and `npm run lint` pass without `.env.local` | **Verified.** Build succeeds (url-builder routes are dynamic λ, no build-time env access). Lint passes; the only warning is pre-existing in untouched `components/ServiceTooltipElement.tsx` |
| 7 | No behavior change on the rest of the marketing site | **Verified.** Diff stat: only new files + `package.json`/`package-lock.json` (two Supabase deps added); middleware matcher scoped to `/url-builder/:path*`; dev homepage returns 200 with no env vars |
| 8 | Human-only steps documented as checklist; clear failure message when env vars missing | **Verified.** Plan Tasks 7–12 are click-by-click checklists. With no `.env.local`, `/url-builder` returns 500 and both the rendered error page and dev log show: "Missing Supabase environment variables: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local…" (`lib/supabase/client.ts:7-11`) |

## Notes

- `setAll(cookiesToSet, headers)` two-argument signature in `lib/supabase/middleware.ts:18` is confirmed valid against the installed `@supabase/ssr@0.12` type docs.
- Known accepted decisions (server.ts ignoring setAll headers; callback redirect + `cookies()` interplay in Next 14.0.1; placeholder dashboard inheriting global Header/Footer; `router.push`/`router.refresh` ordering) were re-checked and intentionally not flagged.
- Dev server was started and killed during QA; no processes left running.
