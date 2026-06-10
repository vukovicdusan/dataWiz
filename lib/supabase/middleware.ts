import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/client";

export async function updateSession(request: NextRequest) {
  const { url, anonKey } = getSupabaseEnv();

  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });
  let authHeaders: Record<string, string> = {};

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        // Cache-Control etc. — responses that set auth cookies must not be
        // cached by CDNs, or one user's session could be served to another.
        authHeaders = headers;
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

  // Carries session cookies and no-cache headers onto whichever response
  // we return (pass-through or redirect).
  const finalize = (response: NextResponse) => {
    if (response !== supabaseResponse) {
      supabaseResponse.cookies
        .getAll()
        .forEach((cookie) => response.cookies.set(cookie));
    }
    Object.entries(authHeaders).forEach(([name, value]) =>
      response.headers.set(name, value)
    );
    return response;
  };

  const { pathname } = request.nextUrl;

  // Never interfere with the OAuth callback exchange.
  if (pathname.startsWith("/url-builder/auth")) {
    return finalize(supabaseResponse);
  }

  // Signed out: the dashboard is locked.
  if (!user && pathname.startsWith("/url-builder/dashboard")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/url-builder";
    redirectUrl.search = "";
    return finalize(NextResponse.redirect(redirectUrl));
  }

  // Signed in: skip the login page.
  if (user && pathname === "/url-builder") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/url-builder/dashboard";
    redirectUrl.search = "";
    return finalize(NextResponse.redirect(redirectUrl));
  }

  return finalize(supabaseResponse);
}
