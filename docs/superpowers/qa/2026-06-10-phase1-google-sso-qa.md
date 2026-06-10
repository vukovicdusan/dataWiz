# QA — Phase 1: Supabase Setup + Google SSO Login

QA round 2 (post-popup-signin + security audit), 2026-06-10. Round 1 verdict superseded.

**Verdict: PASS — feature complete, build/lint clean, no secrets in git history or the client bundle, auth flow code is sound; ship-ready.**

Branch `ub-phase1-google-sso`, range `f5cb201..acc2ad9`. Verified 2026-06-10 with real keys present in `.env.local`.

## Human steps remaining

None — setup complete, smoke test passed by user (sign-in popup, dashboard, sign-out, locked dashboard, marketing site untouched).

## Security audit

Plain-language summary of what was checked, focused on the safety of your API keys and secrets.

1. **Your secret keys are NOT in git.** `.env.local` (the file holding all four keys) is gitignored (`.gitignore:29`, pattern `.env*`) — `git check-ignore` confirms it, and `git log --all -- .env.local` confirms it was never committed in any branch's history. I also searched **every commit ever made** for the actual key values: the Supabase project ID (`dgigfivapfhgnbyucxfd`), unique fragments of the anon key and the service-role key, the Google client ID number, and the Google client-secret prefix (`GOCSPX`). Zero matches anywhere. The docs (`plan`, `spec`) mention only variable *names* and placeholder text like `paste-your-service-role-key-here` — never real values.
2. **No secrets in the code shipped to visitors' browsers.** After a fresh `npm run build`, the compiled browser code in `.next/static/` contains no trace of `service_role` or `SUPABASE_SERVICE_ROLE_KEY`. The Supabase URL, anon key, and Google client ID *do* appear there — **that is by design and safe**: anything named `NEXT_PUBLIC_*` is meant to be public. The anon key can only do what Supabase's row-level security allows, and the Google client ID only works from origins you authorized in Google Cloud. The one truly dangerous key (service-role) never leaves your machine.
3. **The master key is read by no code at all.** `SUPABASE_SERVICE_ROLE_KEY` appears nowhere in the app source — only in docs as a name. It sits unused in `.env.local`, reserved for Phase 2 server-side work, exactly as the spec intends.
4. **The sign-in code follows security best practice.** The Google popup flow uses a one-time random "nonce": a cryptographically random value is generated per page load, its SHA-256 hash is given to Google, and the raw value is given to Supabase, which verifies they match (`components/url-builder/GoogleSignInButton.tsx:34-43,67-81`). This prevents a stolen sign-in token from being replayed. Additionally: no tokens or credentials are ever logged (`console.*` appears nowhere in the auth code); error messages shown to users contain no secrets; all redirects go to fixed internal paths (no "open redirect" a phisher could abuse); no `dangerouslySetInnerHTML` anywhere (user name/email are rendered through React's automatic escaping, blocking XSS); the middleware attaches `Cache-Control: no-store`-style headers to every response that sets auth cookies (`lib/supabase/middleware.ts:18-31,49-51`), so a CDN can never serve one user's session to another; and the auth callback never echoes or logs the OAuth code — on failure it redirects to a clean `?error=auth` URL (`app/url-builder/auth/callback/route.ts`).

## BLOCKERS

None.

## SHOULD-FIX

None.

## NITS

1. **Raw Supabase error message rendered to the user.** `components/url-builder/GoogleSignInButton.tsx:83` displays `error.message` verbatim. Supabase auth errors contain no secrets, but they can be technical/confusing (e.g. "Invalid token"). Suggested fix: show a friendly generic message and keep the raw one out of the UI.
2. **Awkward greeting fallback (carried over from round 1).** `app/url-builder/dashboard/page.tsx:22-23` falls back to `"there"`, rendering "Welcome, there!" when Google provides no `full_name`. Suggested fix: fall back to the email local-part or render just "Welcome!".

## Inherent trade-offs (notes, not defects)

- `@supabase/ssr` stores the session in cookies that JavaScript can read — required for the browser client to work. The mitigation is an XSS-free codebase (verified above: no `dangerouslySetInnerHTML`, all output React-escaped).
- The Google sign-in button loads a third-party script from `accounts.google.com`. This is the official, only-supported way to use Google Identity Services; ad blockers may block it, which the code handles with a clear on-screen message (`GoogleSignInButton.tsx:119-123`).
- `/url-builder/auth/callback` is currently unused by the popup flow; kept intentionally for Phase 2 redirect flows (invites). It is safe as-is: the code it would exchange is single-use and never logged.

## Acceptance criteria status

Criteria from `docs/superpowers/specs/2026-06-10-phase1-google-sso.md`. Note: criterion 1's wording was amended in the spec (faded background logo removed at user request after the smoke test), and the sign-in trigger decision was revised from redirect OAuth to the Google Identity Services popup + `signInWithIdToken`.

| # | Criterion | Status |
|---|---|---|
| 1 | Signed out, `/url-builder` renders site header + centered "Continue with Google" card (logo removed per amended spec) | **Verified** — `app/url-builder/page.tsx` (no logo, centered card); user-confirmed in browser |
| 2 | Google sign-in lands on `/url-builder/dashboard` showing name + email | **Verified** — via the popup flow (`GoogleSignInButton.tsx` → `signInWithIdToken` → `dashboard/page.tsx`); user-confirmed in browser |
| 3 | Signed out, `/url-builder/dashboard` redirects to `/url-builder` | **Verified** — `lib/supabase/middleware.ts:66-71` + page-level `redirect()` at `dashboard/page.tsx:18-20`; user-confirmed |
| 4 | Signed in, `/url-builder` redirects to dashboard | **Verified** — `lib/supabase/middleware.ts:74-79`; user-confirmed |
| 5 | Sign out returns to `/url-builder`; dashboard locked again | **Verified** — `SignOutButton.tsx`; middleware as safety net; user-confirmed |
| 6 | `npm run build` and `npm run lint` pass | **Verified** — both exit 0 on `acc2ad9`; only lint warning is pre-existing in untouched `components/ServiceTooltipElement.tsx` |
| 7 | No behavior change on the rest of the marketing site | **Verified** — `git diff f5cb201..acc2ad9 --stat`: only new files plus `package.json`/`package-lock.json`; middleware matcher scoped to `/url-builder/:path*`; user-confirmed marketing site untouched |
| 8 | Human-only steps documented as checklist; clear failure message when env vars missing | **Verified** — plan Tasks 7–12 are click-by-click checklists (all now completed by user); missing-env messages in `lib/supabase/client.ts:7-11` and `GoogleSignInButton.tsx:57-62` |
