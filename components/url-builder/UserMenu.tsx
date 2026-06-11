"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Avatar from "@/components/url-builder/Avatar";

type UserMenuProps = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

const menuItemClasses =
  "block w-full rounded-md px-3 py-2 text-left text-gray-200 transition hover:bg-primaryAccent/30 disabled:opacity-60";

const UserMenu = ({ name, email, avatarUrl }: UserMenuProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/url-builder");
      router.refresh();
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full p-1 pr-3 transition hover:bg-secondaryAccent/40"
      >
        <Avatar name={name} avatarUrl={avatarUrl} size={36} />
        <span className="hidden font-bold text-white sm:inline">{name}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 w-60 rounded-xl border border-secondaryBg/60 bg-secondaryAccent p-2 shadow-2xl"
        >
          <p className="truncate px-3 py-2 text-xs text-gray-400">{email}</p>
          <Link
            role="menuitem"
            href="/url-builder/dashboard"
            className={menuItemClasses}
            onClick={() => setIsOpen(false)}
          >
            Builder
          </Link>
          <Link
            role="menuitem"
            href="/url-builder/team"
            className={menuItemClasses}
            onClick={() => setIsOpen(false)}
          >
            Team
          </Link>
          <button
            role="menuitem"
            type="button"
            disabled={isSigningOut}
            className={menuItemClasses}
            onClick={handleSignOut}
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
