"use client";

import { usePathname } from "next/navigation";

const ChromeGate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (
    pathname === "/url-builder/dashboard" ||
    pathname?.startsWith("/url-builder/dashboard/") ||
    pathname === "/url-builder/team" ||
    pathname?.startsWith("/url-builder/team/")
  ) {
    return null;
  }
  return <>{children}</>;
};

export default ChromeGate;
