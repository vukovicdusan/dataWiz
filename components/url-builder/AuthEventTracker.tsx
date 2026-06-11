"use client";

import { useEffect } from "react";
import { AUTH_EVENT_STORAGE_KEY } from "@/components/url-builder/GoogleSignInButton";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Reads the flag GoogleSignInButton stored before the redirect and pushes
// exactly one sign_up/login event to the dataLayer. Plain reloads find no
// flag and push nothing. Renders nothing.
const AuthEventTracker = () => {
  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(AUTH_EVENT_STORAGE_KEY);
      // Remove BEFORE pushing so a re-run of the effect (React strict mode
      // mounts effects twice in dev) can never push the event twice.
      if (raw !== null) sessionStorage.removeItem(AUTH_EVENT_STORAGE_KEY);
    } catch {
      return;
    }
    if (!raw) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return;
    }
    if (typeof parsed !== "object" || parsed === null) return;
    const { event, email, user_id } = parsed as Record<string, unknown>;
    if (event !== "sign_up" && event !== "login") return;
    if (typeof email !== "string" || typeof user_id !== "string") return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, email, user_id });
  }, []);

  return null;
};

export default AuthEventTracker;
