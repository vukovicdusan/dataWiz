// Shared contract for the sign_up/login analytics handoff: the sign-in
// button stores a flag under this key, and flushAuthEvent pushes it to the
// dataLayer exactly once. Client-side only.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const AUTH_EVENT_STORAGE_KEY = "dw-auth-event";

// Reads the stored auth event and pushes exactly one sign_up/login event to
// the dataLayer. No-op when no flag is stored (e.g. plain page reloads) or
// when storage is unavailable.
export function flushAuthEvent(): void {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(AUTH_EVENT_STORAGE_KEY);
    // Remove BEFORE pushing so a re-run (React strict mode mounts effects
    // twice in dev) can never push the event twice.
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
}
