"use client";

import { usePathname } from "next/navigation";

const ChromeGate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname?.startsWith("/url-builder/dashboard")) {
    return null;
  }
  return <>{children}</>;
};

export default ChromeGate;
