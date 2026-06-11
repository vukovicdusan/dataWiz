import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import { getTeamCustomValues } from "@/lib/url-builder/customValues";
import DashboardHeader from "@/components/url-builder/DashboardHeader";
import BuilderForm from "@/components/url-builder/builder/BuilderForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | DataWiz URL Builder",
};

export default async function UrlBuilderDashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/url-builder");
  }

  await ensureProfileAndTeam(user);
  const team = await getTeamWithMembers(user.id);
  if (!team) {
    redirect("/url-builder");
  }

  const customValues = await getTeamCustomValues();

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? null;
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ?? null;
  const email = user.email ?? "";

  return (
    <div className="min-h-screen">
      <DashboardHeader
        name={fullName ?? email}
        email={email}
        avatarUrl={avatarUrl}
      />
      <div className="flex flex-col items-center px-4 py-12">
        <BuilderForm initialCustomValues={customValues} />
        <p className="mt-10 text-gray-300">
          Not sure which values to pick?{" "}
          <a
            href="/utm-tagging-guide.pdf"
            download
            className="inline-flex items-center gap-1.5 font-bold text-primaryAccent transition hover:text-primaryAccent/80"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download UTM Tagging Guide
          </a>
        </p>
      </div>
    </div>
  );
}
