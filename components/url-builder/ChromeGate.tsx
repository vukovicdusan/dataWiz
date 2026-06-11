"use client";

import { usePathname } from "next/navigation";

// Signed-in app pages render their own header/nav instead of the
// marketing site chrome.
const APP_ROUTES = [
  "/url-builder/dashboard",
  "/url-builder/history",
  "/url-builder/team",
  "/url-builder/channels",
];

const ChromeGate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (
    pathname &&
    APP_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return null;
  }
  return <>{children}</>;
};

export default ChromeGate;
