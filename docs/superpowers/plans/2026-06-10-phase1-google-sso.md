# Phase 1 — Supabase Setup + Google SSO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A working Google sign-in loop for the URL Builder: `/url-builder` login page → Google consent → protected `/url-builder/dashboard` placeholder (name + email + Sign out) → signed out and locked out again.

**Architecture:** Cookie-based Supabase Auth via `@supabase/ssr` inside the existing Next.js 14 App Router site. Three small helpers in `lib/supabase/` (browser client, server client, middleware session-refresh), a root `middleware.ts` scoped strictly to `/url-builder/:path*` for route protection, and three pages/routes under `app/url-builder/`. The global site layout (Header/Footer, Titillium font, `bg-primaryBg`) is inherited — no layout restructuring in this phase.

**Tech Stack:** Next.js 14.0.1 (App Router), TypeScript, Tailwind CSS, `@supabase/supabase-js`, `@supabase/ssr`.

**Spec:** `docs/superpowers/specs/2026-06-10-phase1-google-sso.md` (parent: `docs/superpowers/specs/2026-06-10-url-builder-design.md`)

**Branch:** `ub-phase1-google-sso` (already checked out — never commit to `main`).

---

## Important constraints (read before executing)

1. **`npm run build` must pass WITHOUT `.env.local` existing.** All env vars are read *inside* functions, never at module top level. Pages that touch the session use request-time APIs (`cookies()`, `searchParams`, `request.url`) so Next 14 renders them dynamically (λ) and never executes Supabase code at build time. The dashboard page additionally declares `export const dynamic = "force-dynamic"` to be explicit.
2. **Next 14, not 15:** `cookies()` from `next/headers` is **synchronous** — no `await cookies()`. Cookie adapters use the modern `@supabase/ssr` `getAll`/`setAll` API (the deprecated `get`/`set`/`remove` API must not be used).
3. **Middleware must never touch `/url-builder/auth/*`** — the OAuth callback must be reachable while signed out and during the code exchange.
4. **No test suite in this repo.** Per-task verification is `npm run build` (plus `npm run lint` at the end); full behavior is verified by the human smoke test (Task 12).
5. **Each implementation task ends in exactly one commit.** `git add` specific files only. Every commit message ends with the trailer:
   `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`
6. **Tasks 7–11 are HUMAN-ONLY** (the user is not a developer — instructions are click-by-click). Code tasks 1–6 can be completed and committed before the human tasks. Task 12 (smoke test, human) requires everything else done.

## File structure

| File | Responsibility |
|---|---|
| `lib/supabase/client.ts` (new) | Browser Supabase client factory (`createBrowserClient`) |
| `lib/supabase/server.ts` (new) | Server Supabase client factory (`createServerClient` + Next 14 `cookies()`) |
| `lib/supabase/middleware.ts` (new) | `updateSession()` — refreshes the auth session and applies redirect rules |
| `middleware.ts` (new, repo root) | Next.js middleware entry, matcher `["/url-builder/:path*"]` |
| `app/url-builder/page.tsx` (new) | Public login page (faded logo + "Continue with Google" card + friendly error) |
| `components/url-builder/GoogleSignInButton.tsx` (new) | Client component calling `signInWithOAuth` |
| `app/url-builder/auth/callback/route.ts` (new) | GET: `exchangeCodeForSession`, redirect to dashboard or back with error |
| `app/url-builder/dashboard/page.tsx` (new) | Protected placeholder dashboard (server component: name + email) |
| `components/url-builder/SignOutButton.tsx` (new) | Client component calling `signOut()` then navigating to `/url-builder` |
| `package.json` / `package-lock.json` (modified) | Add the two Supabase packages |

No existing file is modified except `package.json`/`package-lock.json` — zero risk to the marketing site.

---

### Task 1: Install Supabase packages

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm — do not hand-edit)

- [ ] **Step 1: Install dependencies**

Run (in the repo root):

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Expected: both packages added to `dependencies` in `package.json`, no errors.

- [ ] **Step 2: Verify the build still passes**

```bash
npm run build
```

Expected: build succeeds exactly as before (no new pages yet).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "$(cat <<'EOF'
Add Supabase auth packages for the URL Builder

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Supabase client helpers (browser + server)

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`

Both helpers read env vars **inside** the factory function (never at module level) so `npm run build` passes without `.env.local`, and both throw a clear, human-readable error if the vars are missing (acceptance criterion 8).

- [ ] **Step 1: Create `lib/supabase/client.ts`** with exactly this content:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local at the project root, then restart the dev server. See docs/superpowers/plans/2026-06-10-phase1-google-sso.md (Task 11) for where to find these values."
    );
  }

  return { url, anonKey };
}

export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
```

- [ ] **Step 2: Create `lib/supabase/server.ts`** with exactly this content:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/client";

export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll was called from a Server Component, which cannot write
          // cookies. Safe to ignore: the middleware refreshes sessions.
        }
      },
    },
  });
}
```

Note: `cookies()` is synchronous in Next 14 — do NOT add `await`. `getSupabaseEnv` lives in `client.ts` but contains no browser-only code, so importing it server-side is safe.

- [ ] **Step 3: Verify the build passes (without `.env.local`)**

```bash
npm run build
```

Expected: build succeeds — nothing imports these helpers yet, and env vars are only read at call time.

- [ ] **Step 4: Commit**

```bash
git add lib/supabase/client.ts lib/supabase/server.ts
git commit -m "$(cat <<'EOF'
Add Supabase browser and server client helpers with clear env-var errors

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Middleware — session refresh + route protection for /url-builder only

**Files:**
- Create: `lib/supabase/middleware.ts`
- Create: `middleware.ts` (repo root, next to `package.json`)

Redirect rules (from the spec):
- `/url-builder/auth/*` → never redirected (callback must work while signed out).
- Signed **out** + `/url-builder/dashboard` (or anything under it) → redirect to `/url-builder`.
- Signed **in** + exactly `/url-builder` → redirect to `/url-builder/dashboard`.
- Matcher is scoped to `/url-builder/:path*` so the rest of the marketing site is never touched.

- [ ] **Step 1: Create `lib/supabase/middleware.ts`** with exactly this content:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/client";

function withSessionCookies(redirect: NextResponse, session: NextResponse) {
  session.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}

export async function updateSession(request: NextRequest) {
  const { url, anonKey } = getSupabaseEnv();

  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request: { headers: request.headers },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: do not run other code between createServerClient and
  // supabase.auth.getUser() — it can cause hard-to-debug session bugs.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Never interfere with the OAuth callback exchange.
  if (pathname.startsWith("/url-builder/auth")) {
    return supabaseResponse;
  }

  // Signed out: the dashboard is locked.
  if (!user && pathname.startsWith("/url-builder/dashboard")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/url-builder";
    redirectUrl.search = "";
    return withSessionCookies(NextResponse.redirect(redirectUrl), supabaseResponse);
  }

  // Signed in: skip the login page.
  if (user && pathname === "/url-builder") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/url-builder/dashboard";
    redirectUrl.search = "";
    return withSessionCookies(NextResponse.redirect(redirectUrl), supabaseResponse);
  }

  return supabaseResponse;
}
```

- [ ] **Step 2: Create `middleware.ts`** at the repo root with exactly this content:

```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/url-builder/:path*"],
};
```

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```

Expected: build succeeds; output mentions a Middleware bundle. Middleware is compiled but not executed at build time, so missing env vars do not break the build.

- [ ] **Step 4: Commit**

```bash
git add lib/supabase/middleware.ts middleware.ts
git commit -m "$(cat <<'EOF'
Protect /url-builder routes with session-aware middleware

Signed-out visits to the dashboard bounce to the login page; signed-in
visits to the login page bounce to the dashboard. The OAuth callback and
the rest of the marketing site are untouched (matcher is /url-builder only).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Login page at /url-builder

**Files:**
- Create: `components/url-builder/GoogleSignInButton.tsx`
- Create: `app/url-builder/page.tsx`

Design: global site Header/Footer are inherited from `app/layout.tsx` (do not add a layout). Behind the content, a large low-opacity DataWiz logo (`public/images/full-logo-blue.png`) anchored top-left. Centered dark card (consistent with `primaryBg` `#020315`, accents `primaryAccent` `#2E68DD` / `secondaryBg` `#454A5C`) with a "Continue with Google" button. Reading `searchParams` makes the page request-time rendered, so the friendly `?error=auth` message (set by the callback in Task 5) works.

- [ ] **Step 1: Create `components/url-builder/GoogleSignInButton.tsx`** with exactly this content:

```tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const GoogleSignInButton = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/url-builder/auth/callback`,
        },
      });
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Unable to start sign-in."
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleSignIn}
        className="mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-md bg-white px-5 py-3 font-bold text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primaryAccent focus:ring-offset-2 focus:ring-offset-primaryBg"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
        Continue with Google
      </button>
      {errorMessage && (
        <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
      )}
    </div>
  );
};

export default GoogleSignInButton;
```

- [ ] **Step 2: Create `app/url-builder/page.tsx`** with exactly this content:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import fullLogo from "@/public/images/full-logo-blue.png";
import GoogleSignInButton from "@/components/url-builder/GoogleSignInButton";

export const metadata: Metadata = {
  title: "URL Builder | DataWiz",
  description: "Sign in to the DataWiz UTM URL Builder.",
};

export default function UrlBuilderLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const hasAuthError = searchParams.error === "auth";

  return (
    <div className="relative min-h-[75vh]">
      <Image
        src={fullLogo}
        alt=""
        aria-hidden="true"
        priority
        className="pointer-events-none absolute left-0 top-0 w-[30rem] max-w-[75vw] opacity-10"
      />
      <div className="relative z-10 flex min-h-[75vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 text-center shadow-2xl backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white">URL Builder</h1>
          <p className="mt-3 text-gray-300">
            Build consistent, trackable campaign URLs with your team. Sign in
            with your Google account to get started.
          </p>
          {hasAuthError && (
            <p className="mt-5 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">
              Something went wrong while signing you in. Please try again.
            </p>
          )}
          <div className="mt-7">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}
```

Note: the `@/*` path alias maps to the repo root, so `@/public/images/full-logo-blue.png` resolves (Header uses the same static-import pattern with a relative path). Avoid apostrophes in JSX text — `react/no-unescaped-entities` is enforced by `eslint-config-next`.

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```

Expected: build succeeds; `/url-builder` appears in the route list. Because the page reads `searchParams`, it is rendered at request time and no Supabase env vars are needed at build.

- [ ] **Step 4: Commit**

```bash
git add components/url-builder/GoogleSignInButton.tsx app/url-builder/page.tsx
git commit -m "$(cat <<'EOF'
Add /url-builder login page with Continue with Google

Faded top-left DataWiz logo behind a centered dark sign-in card; shows a
friendly message when the OAuth callback reports an error.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: OAuth callback route

**Files:**
- Create: `app/url-builder/auth/callback/route.ts`

Google → Supabase → this route with `?code=...`. We exchange the code for a session (sets auth cookies via the server client) and redirect to the dashboard. Any failure (missing code, exchange error) redirects back to `/url-builder?error=auth`, which the login page renders as a friendly message. This route follows the existing typed-route-handler convention from `app/case-studies/tracking/[slug]/case-study/route.ts`.

- [ ] **Step 1: Create `app/url-builder/auth/callback/route.ts`** with exactly this content:

```typescript
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(
        new URL("/url-builder/dashboard", requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(
    new URL("/url-builder?error=auth", requestUrl.origin)
  );
}
```

Note: in a Route Handler, `cookies().set(...)` is permitted in Next 14, so the server client's `setAll` writes the session cookies here (the try/catch in `lib/supabase/server.ts` only swallows writes from Server Components). Using `request.url` makes this handler dynamic — it is never executed at build time.

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```

Expected: build succeeds; `/url-builder/auth/callback` appears as a dynamic (λ) route.

- [ ] **Step 3: Commit**

```bash
git add app/url-builder/auth/callback/route.ts
git commit -m "$(cat <<'EOF'
Complete Google OAuth code exchange at /url-builder/auth/callback

Successful sign-ins land on the dashboard; failures return to the login
page with a friendly error message.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Placeholder dashboard + Sign out

**Files:**
- Create: `components/url-builder/SignOutButton.tsx`
- Create: `app/url-builder/dashboard/page.tsx`

Server component reads the user via the server client (defense in depth: middleware already blocks signed-out visits, but the page also redirects if no user). Shows the Google name + email from user metadata and a Sign out button. Placeholder only — dashboard chrome (logo link, avatar dropdown) is Phase 2.

- [ ] **Step 1: Create `components/url-builder/SignOutButton.tsx`** with exactly this content:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const SignOutButton = () => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/url-builder");
      router.refresh();
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
    >
      {isSigningOut ? "Signing out..." : "Sign out"}
    </button>
  );
};

export default SignOutButton;
```

Note: `router.refresh()` after `push` re-renders server components without the (now deleted) session cookies, so the middleware locks the dashboard again immediately.

- [ ] **Step 2: Create `app/url-builder/dashboard/page.tsx`** with exactly this content:

```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/url-builder/SignOutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | DataWiz URL Builder",
};

export default async function UrlBuilderDashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/url-builder");
  }

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ?? "there";
  const email = user.email ?? "";

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-white">
          Welcome, {fullName}!
        </h1>
        <p className="mt-3 text-gray-300">
          You are signed in as <span className="font-bold">{email}</span>.
        </p>
        <p className="mt-3 text-gray-400">
          The URL Builder is coming in the next phase. This page confirms your
          sign-in works.
        </p>
        <div className="mt-7">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify the full build and lint pass (still without `.env.local`)**

```bash
npm run build && npm run lint
```

Expected: both succeed. `/url-builder/dashboard` is listed as dynamic (λ) — `force-dynamic` plus `cookies()` usage means it is never prerendered, so missing env vars cannot break the build.

- [ ] **Step 4: Verify the clear missing-env error (acceptance criterion 8)**

Only if `.env.local` does NOT exist yet (skip otherwise):

```bash
ls .env.local 2>/dev/null || (npm run dev & sleep 8 && curl -s http://localhost:3000/url-builder | grep -c "Missing Supabase environment variables"; kill %1)
```

Expected: prints `1` or more (the dev error overlay contains the clear message thrown by `getSupabaseEnv` in the middleware). If `.env.local` already exists, this check is satisfied by code review of `lib/supabase/client.ts`.

- [ ] **Step 5: Commit**

```bash
git add components/url-builder/SignOutButton.tsx app/url-builder/dashboard/page.tsx
git commit -m "$(cat <<'EOF'
Add protected placeholder dashboard with Google identity and sign out

Shows the signed-in Google name and email; Sign out clears the session
and returns to the login page, locking the dashboard again.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7 (HUMAN-ONLY): Create the Supabase project

> Do this yourself in a web browser — no code involved. It is free. Note: website
> buttons/menus occasionally get renamed; if a label is slightly different, look
> for the closest match.

- [ ] **Step 1:** Go to https://supabase.com and click **Start your project** (top right). Sign up or sign in — the easiest option is **Continue with GitHub** or **Continue with Google** using your usual account.
- [ ] **Step 2:** If asked to create an **organization**, accept the suggested name and choose the **Free** plan.
- [ ] **Step 3:** Click **New project** and fill in:
  - **Project name:** `datawiz-url-builder`
  - **Database password:** click **Generate a password**, then copy it and save it somewhere safe (a password manager or a private note). You will not need it for this project, but Supabase requires it and you cannot easily see it again.
  - **Region:** pick the one closest to you (for Serbia, choose **Central EU (Frankfurt)** or similar).
- [ ] **Step 4:** Click **Create new project** and wait 1–2 minutes while the green "setting up" indicators finish.
- [ ] **Step 5:** Get the **callback URL** you will need in the next task:
  - In the left sidebar click **Authentication** (the icon that looks like a person or a key).
  - Click **Sign In / Providers** (it may just say **Providers**).
  - In the list of providers, click **Google**.
  - You will see a field labeled **Callback URL (for OAuth)** that looks like `https://abcdefghijklmnop.supabase.co/auth/v1/callback`. Click the copy icon next to it and paste it into a note — you need it in Task 8. Leave this browser tab open.

---

### Task 8 (HUMAN-ONLY): Create the Google Cloud OAuth client

> This tells Google "the DataWiz URL Builder is allowed to ask people to sign in
> with Google." It is free and you will not be billed.

- [ ] **Step 1:** In a new browser tab, go to https://console.cloud.google.com and sign in with your Google account. If a welcome screen asks you to agree to terms, agree and continue.
- [ ] **Step 2:** Create a project: at the top of the page, click the **project picker** (a dropdown next to the "Google Cloud" logo), then click **New project**. Name it `DataWiz URL Builder`, leave everything else as is, click **Create**. When the notification appears, click **Select project** (or pick it from the same dropdown).
- [ ] **Step 3:** Set up the consent screen (what users see when signing in):
  - Click the **☰ menu** (top left) → **APIs & Services** → **OAuth consent screen**. (On newer accounts this may be called **Google Auth Platform** → **Branding** — same idea. If a "Get started" wizard appears, follow it with the same answers below.)
  - **App name:** `DataWiz URL Builder`. **User support email:** your email. **Audience / User type:** choose **External**. **Developer contact email:** your email again.
  - Click **Save and continue** through any remaining steps without changing anything (you do not need extra "scopes"), then **Back to dashboard** / **Create**.
- [ ] **Step 4:** Add yourself as a test user (while the app is in "Testing" mode, only listed people can sign in — fine for this phase):
  - On the OAuth consent screen page find **Test users** (newer UI: **Audience** → **Test users**), click **+ Add users**, type your own Gmail address, click **Save**. Add any teammates who will test, too.
- [ ] **Step 5:** Create the OAuth client:
  - **☰ menu** → **APIs & Services** → **Credentials**.
  - Click **+ Create credentials** (top) → **OAuth client ID**.
  - **Application type:** **Web application**. **Name:** `DataWiz URL Builder Web`.
  - Under **Authorized redirect URIs** click **+ Add URI** and paste the **Callback URL** you copied from Supabase in Task 7 (it ends with `/auth/v1/callback`).
  - Click **Create**.
- [ ] **Step 6:** A box appears showing your **Client ID** (long text ending in `.apps.googleusercontent.com`) and **Client secret**. Copy both into a private note — you need them in Task 9. (If you close the box, you can reopen them from the Credentials list by clicking the client name.)

---

### Task 9 (HUMAN-ONLY): Turn on Google sign-in inside Supabase

- [ ] **Step 1:** Go back to the Supabase tab from Task 7 (**Authentication** → **Sign In / Providers** → **Google**).
- [ ] **Step 2:** Switch on the toggle labeled **Enable Sign in with Google**.
- [ ] **Step 3:** Paste the **Client ID** from Task 8 into the **Client IDs** (or **Client ID**) field.
- [ ] **Step 4:** Paste the **Client secret** from Task 8 into the **Client Secret** field.
- [ ] **Step 5:** Click **Save**. You should see a confirmation message.

---

### Task 10 (HUMAN-ONLY): Tell Supabase where your app lives

> This allows Supabase to send people back to your app on your computer after
> they sign in.

- [ ] **Step 1:** In Supabase, in the left sidebar click **Authentication** → **URL Configuration**.
- [ ] **Step 2:** Set **Site URL** to exactly: `http://localhost:3000`
- [ ] **Step 3:** Under **Redirect URLs** click **Add URL** and enter exactly: `http://localhost:3000/url-builder/auth/callback`
- [ ] **Step 4:** Click **Save**.

---

### Task 11 (HUMAN-ONLY): Create the .env.local file with your secret keys

> These three values are like passwords that let the app talk to your Supabase
> project. They live only on your computer in a file named `.env.local`, which
> git is already set up to never upload.

- [ ] **Step 1:** Find the three values in Supabase:
  - In the left sidebar click the **gear icon (Project Settings)**.
  - Click **API** (on newer dashboards this is split into **Data API** and **API Keys** — check both pages):
    - **Project URL** — looks like `https://abcdefghijklmnop.supabase.co`. This is your `NEXT_PUBLIC_SUPABASE_URL`.
    - The key labeled **anon** / **public** — a very long text starting with `eyJ`. This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`. (On newer dashboards it may sit under a tab called **Legacy API keys** on the **API Keys** page — use that one.)
    - The key labeled **service_role** / **secret** — click the eye/**Reveal** button to see it. This is your `SUPABASE_SERVICE_ROLE_KEY`. Treat it like a master password: never paste it anywhere except this file.
- [ ] **Step 2:** Create the file. In your code editor (the same window where this project is open), in the **top level of the project folder** (the same folder that contains `package.json`), create a new file named exactly `.env.local` (starting with a dot, no other extension) and paste this in, replacing each `paste-...-here` with your real value (no quotes, no spaces around the `=`):

```bash
NEXT_PUBLIC_SUPABASE_URL=paste-your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-public-key-here
SUPABASE_SERVICE_ROLE_KEY=paste-your-service-role-key-here
```

- [ ] **Step 3:** Save the file.
- [ ] **Step 4:** If the dev server is running in a terminal (you started it with `npm run dev` earlier), stop it by clicking in that terminal and pressing **Ctrl+C**, then start it again with `npm run dev`. (Next.js only reads `.env.local` when it starts.)
- [ ] **Step 5:** Double-check the secret stays private: in a terminal in the project folder run `git status` — `.env.local` must NOT appear in the list. (It will not: the project's `.gitignore` already excludes all `.env*` files.)

---

### Task 12 (HUMAN-ONLY): Smoke test the whole sign-in loop

> Do this only after Tasks 1–11 are all complete. You will need the dev server
> running: in a terminal in the project folder run `npm run dev` and wait for
> "Ready". Keep it running the whole time.

- [ ] **Step 1 — Login page looks right (criterion 1):** In your browser go to `http://localhost:3000/url-builder`. You should see: the normal DataWiz site header at the top, a large faded DataWiz logo in the top-left area behind the content, and a centered dark card with a white **Continue with Google** button.
- [ ] **Step 2 — Locked dashboard (criterion 3):** Go to `http://localhost:3000/url-builder/dashboard` directly. You should be bounced straight back to the login page.
- [ ] **Step 3 — Sign in (criterion 2):** On the login page click **Continue with Google**, pick your Google account, and approve. (If Google shows a warning that the app is unverified/in testing, click **Continue** — that is expected while the app is in testing mode.) You should land on `http://localhost:3000/url-builder/dashboard` and see **your name and your email** on the page.
- [ ] **Step 4 — Login page skipped while signed in (criterion 4):** While still signed in, go to `http://localhost:3000/url-builder`. You should be sent straight to the dashboard.
- [ ] **Step 5 — Sign out (criterion 5):** Click **Sign out**. You should be back on the login page. Now go to `http://localhost:3000/url-builder/dashboard` again — you must be bounced back to the login page.
- [ ] **Step 6 — Marketing site untouched (criterion 7):** Visit `http://localhost:3000` (homepage) and `http://localhost:3000/case-studies/tracking`. Both should look and behave exactly as before — no redirects, no errors.
- [ ] **Step 7:** If anything failed, tell Claude exactly which step number failed and what you saw on screen (a screenshot helps).

---

## QA expectations (acceptance criteria from the design doc)

1. Signed out, `/url-builder` renders: site header, faded top-left DataWiz logo, centered "Continue with Google" card. → Task 4; verified Task 12 Step 1.
2. Clicking the button completes Google sign-in and lands on `/url-builder/dashboard` showing the user's Google name and email. → Tasks 4–6; verified Task 12 Step 3.
3. Signed out, visiting `/url-builder/dashboard` directly redirects to `/url-builder`. → Task 3; verified Task 12 Steps 2 and 5.
4. Signed in, visiting `/url-builder` redirects to `/url-builder/dashboard`. → Task 3; verified Task 12 Step 4.
5. Sign out returns to `/url-builder`; the dashboard is locked again. → Task 6; verified Task 12 Step 5.
6. `npm run build` and `npm run lint` pass. → Verified at the end of every code task and together in Task 6 Step 3 (both must pass WITHOUT `.env.local`).
7. No change in behavior anywhere else on the marketing site. → Guaranteed by the scoped middleware matcher and by touching no existing files except `package.json`; verified Task 12 Step 6.
8. Human-only steps are an explicit checklist (Tasks 7–12 below); the app fails with a clear message if env vars are missing (`getSupabaseEnv` throw, verified in Task 6 Step 4).

## Human-only checklist summary

- [ ] **Task 7** — Create the free Supabase project and copy the Google **Callback URL**.
- [ ] **Task 8** — Create the Google Cloud project, consent screen (External + add yourself as a test user), and a **Web application** OAuth client whose redirect URI is the Supabase callback URL; copy the **Client ID** and **Client secret**.
- [ ] **Task 9** — In Supabase, enable the **Google** provider and paste the Client ID + secret.
- [ ] **Task 10** — In Supabase URL Configuration: Site URL `http://localhost:3000`, redirect URL `http://localhost:3000/url-builder/auth/callback`.
- [ ] **Task 11** — Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` and restart the dev server.
- [ ] **Task 12** — Smoke test the full sign-in/sign-out loop in the browser.
