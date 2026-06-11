"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/url-builder/dashboard", label: "Dashboard" },
  { href: "/url-builder/history", label: "History" },
  { href: "/url-builder/team", label: "Team" },
  { href: "/url-builder/channels", label: "Channels" },
] as const;

// App menu row under the header, styled like the marketing TopNavigation:
// uppercase links with thin primaryAccent separators. Always visible, no
// hamburger; the links shrink on small screens so they fit.
const BuilderNav = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="URL Builder"
      className="border-b border-secondaryBg/40 px-4 pb-3 sm:px-8"
    >
      <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li
              key={href}
              className="relative after:absolute after:-right-2 after:top-1/2 after:h-4 after:w-[1px] after:-translate-y-1/2 after:rounded-full after:bg-primaryAccent last:after:bg-transparent sm:after:-right-3"
            >
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`text-xs uppercase transition-colors duration-200 ease-linear hover:text-primaryAccent sm:text-sm ${
                  isActive ? "font-bold text-primaryAccent" : "text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BuilderNav;
