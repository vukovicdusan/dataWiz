"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

const GoogleSignInButton = () => {
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
            const { error } = await supabase.auth.signInWithIdToken({
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
            router.push("/url-builder/dashboard");
            router.refresh();
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
  }, [isScriptReady, router]);

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
