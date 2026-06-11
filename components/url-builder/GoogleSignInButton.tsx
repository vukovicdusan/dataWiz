"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AUTH_EVENT_STORAGE_KEY } from "@/lib/url-builder/authEvent";

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    nonce: string;
    callback: (response: { credential: string }) => void;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      theme: string;
      size: string;
      text: string;
      shape: string;
      width: number;
    }
  ) => void;
};

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

type GoogleSignInButtonProps = {
  // When provided, replaces the default "go to dashboard" navigation after a
  // successful sign-in (used by the invite page to join a team first).
  onSuccess?: () => Promise<void> | void;
};

// Google requires the raw nonce in the resulting ID token while the
// initialize call receives its SHA-256 hash, preventing token replay.
async function generateNonce(): Promise<[string, string]> {
  const random = crypto.getRandomValues(new Uint8Array(32));
  const nonce = btoa(String.fromCharCode(...Array.from(random)));
  const encoded = new TextEncoder().encode(nonce);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  const hashedNonce = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return [nonce, hashedNonce];
}

// A brand-new Supabase user has last_sign_in_at within seconds of
// created_at; returning users signed in long after the account was made.
function isNewAccount(createdAt: string, lastSignInAt: string | undefined): boolean {
  const created = Date.parse(createdAt);
  const lastSignIn = lastSignInAt ? Date.parse(lastSignInAt) : Number.NaN;
  if (!Number.isFinite(created) || !Number.isFinite(lastSignIn)) return false;
  return Math.abs(lastSignIn - created) < 10_000;
}

const GoogleSignInButton = ({ onSuccess }: GoogleSignInButtonProps) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    const googleId = window.google?.accounts.id;
    const buttonParent = buttonRef.current;
    if (!isScriptReady || !googleId || !buttonParent) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setErrorMessage(
        "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local at the project root. Add it and restart the dev server."
      );
      return;
    }

    let isActive = true;

    const setup = async () => {
      const [nonce, hashedNonce] = await generateNonce();
      if (!isActive) return;

      googleId.initialize({
        client_id: clientId,
        nonce: hashedNonce,
        callback: async ({ credential }) => {
          setErrorMessage(null);
          try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: credential,
              nonce,
            });
            if (error) {
              console.error("Google sign-in failed:", error.message);
              setErrorMessage(
                "Sign-in did not complete. Please try again."
              );
              return;
            }
            // Hand the auth event to the dashboard via sessionStorage: it
            // survives any navigation, including hard redirects, and lets
            // the dashboard (where GTM runs) own the push.
            const user = data?.user;
            if (user) {
              try {
                sessionStorage.setItem(
                  AUTH_EVENT_STORAGE_KEY,
                  JSON.stringify({
                    event: isNewAccount(user.created_at, user.last_sign_in_at)
                      ? "sign_up"
                      : "login",
                    email: user.email ?? "",
                    user_id: user.id,
                  })
                );
              } catch {
                // sessionStorage can be unavailable (e.g. blocked storage);
                // sign-in must still work, we just skip the event.
              }
            }
            if (onSuccess) {
              await onSuccess();
            } else {
              router.push("/url-builder/dashboard");
              router.refresh();
            }
          } catch (err) {
            console.error("Google sign-in failed:", err);
            setErrorMessage(
              err instanceof Error &&
                err.message.startsWith("Missing Supabase environment")
                ? err.message
                : "Sign-in did not complete. Please try again."
            );
          }
        },
      });

      googleId.renderButton(buttonParent, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        width: 280,
      });
    };

    setup();

    return () => {
      isActive = false;
      buttonParent.replaceChildren();
    };
  }, [isScriptReady, router, onSuccess]);

  return (
    <div>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setIsScriptReady(true)}
        onError={() =>
          setErrorMessage(
            "Could not load the Google sign-in button. If you use an ad blocker, allow accounts.google.com and reload the page."
          )
        }
      />
      <div ref={buttonRef} className="flex min-h-[40px] justify-center" />
      {errorMessage && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default GoogleSignInButton;
