"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __gtmLoaded?: boolean;
  }
}

export default function GtmRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.__gtmLoaded || !window.dataLayer) return;

    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    window.dataLayer.push({
      event: "page_view",
      page_path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
