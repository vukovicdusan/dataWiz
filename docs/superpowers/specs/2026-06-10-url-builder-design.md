# URL Builder — Design Spec

Date: 2026-06-10
Status: Approved by user

## Goal

A team-based UTM URL builder living inside the existing DataWiz Next.js site. Users sign in with Google (via Supabase Auth), build campaign URLs that follow the DataWiz UTM Tagging Guide (`docs/utm-guide.md`), share a per-team history of generated URLs, and export it as CSV. Public tool: anyone with a Google account can sign up.

## Architecture decision

Build inside this repo (Next.js 14 App Router, Tailwind). Supabase provides auth (Google OAuth) and Postgres with Row Level Security. Sessions are cookie-based via `@supabase/ssr`. Server routes/actions validate input with Zod (same pattern as `lib/caseStudies.ts`). No email sending.

Rejected alternatives: separate app/repo (second deploy, duplicated theme); fully client-side Supabase access (weaker route protection, logic duplication).

## Pages & auth flow

- **`/url-builder`** (public): existing site Header nav; large low-opacity DataWiz logo anchored top-left behind content; centered card with "Continue with Google". If a session exists → redirect to `/url-builder/dashboard`.
- **`/url-builder/auth/callback`**: completes the OAuth code exchange.
- **`/url-builder/invite/[token]`**: invite landing. Stores the token, sends the visitor through Google SSO, then joins them to the inviting team.
- **`/url-builder/dashboard`** (protected): Next.js middleware redirects unauthenticated visits back to `/url-builder`.
- **First sign-in**: ensure a `profiles` row exists; if arriving with a valid invite token join that team, otherwise auto-create a personal team. Then → dashboard.

## Data model (Supabase Postgres, all tables behind RLS)

| Table | Columns (essence) | Notes |
|---|---|---|
| `profiles` | id (= auth.users.id), email, full_name, avatar_url | populated from Google identity |
| `teams` | id, name, created_at | |
| `team_members` | team_id, user_id, joined_at | **unique on user_id** — one team at a time |
| `invites` | id, team_id, token, created_by, expires_at, revoked | token is secret; 7-day expiry; generating a new link revokes the old |
| `custom_values` | id, team_id, param (`source`/`medium`/`campaign`/`term`/`content`), value, created_by | team-shared dropdown additions |
| `generated_urls` | id, team_id, created_by, base_url, source, medium, campaign, term, content, full_url, created_at | history |

RLS: members read/write only their team's rows. Invite acceptance is validated server-side by token.

**Team semantics**
- Every user belongs to exactly one team.
- Accepting an invite switches the user to the inviting team (their old personal team is abandoned; deleted if left empty).
- Leaving a team deletes the membership and auto-creates a fresh personal team. The old team and its history remain intact for remaining members.

## Builder form (dashboard)

- Large base-URL field. Warn if the pasted URL already contains `utm_` params (don't double-tag); helper text reminds users never to tag internal links.
- **Channel picker** (optional) sourced from `docs/utm-guide.md`: Meta Ads, Surfside, Email, Social Media, GMB, Weed Maps, Apple Maps, Other Listings. Picking one pre-fills source/medium (fixed values) and shows format hints for campaign/term/content. **Google Ads** shows the "auto-tagged via GCLID — do not add UTMs" notice and disables generation. Pre-filled values stay editable.
- Five parameter fields: source/medium/campaign required; term/content optional. Each combines guide defaults + team custom values + free typing. A "save to team values" action adds a typed value to the team's shared dropdown.
- **Validation is warn-only** (explicit user choice): uppercase, spaces, or special characters trigger a yellow warning explaining the rule (lowercase, `_` instead of space) but input is never blocked or rewritten.
- **Generate**: builds the encoded URL, displays it below the form, saves it to team history, and the button becomes **Copy** (with "copied!" feedback). Editing any field reverts the button to Generate.

## Dashboard chrome

No site nav. Top-left: small DataWiz logo linking to the main site. Top-right: dropdown trigger shows the user's Google **avatar + name**; menu items:
1. **Invite member** — modal with a copyable invite URL (`/url-builder/invite/{token}`); button to regenerate (revokes previous link).
2. **Leave team** — confirmation dialog explaining remaining members keep access to all data.
3. **Sign out**.

## History & CSV

- Collapsed accordion below the builder: year → month → rows (full URL, creator name, date, per-row copy button). Team-wide, newest first.
- **Download CSV**: server route streams all team history — created_at, creator, base_url, source, medium, campaign, term, content, full_url.

## Error handling & testing

- All writes via server routes/actions with Zod validation; RLS is the safety net beneath them.
- Expired session / invalid or expired invite token → redirect to `/url-builder` with a friendly message.
- No test suite in the repo: each phase is verified manually in the browser (golden path + invite/leave edge cases) before commit. UTM rule logic (warning checks, channel templates, URL assembly) lives as pure functions in `lib/` so it can be unit-tested later.

## Out of scope (v1)

- Roles/permissions within a team (flat membership; anyone can invite).
- Multiple teams per user / team switcher.
- Email sending of any kind.
- Editing or deleting history entries.
- URL shortening.

## Implementation phases

See `roadmap.md` at the repo root.
