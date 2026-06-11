import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import DashboardHeader from "@/components/url-builder/DashboardHeader";
import TeamPanel from "@/components/url-builder/TeamPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team | DataWiz URL Builder",
};

export default async function UrlBuilderTeamPage() {
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
        <TeamPanel team={team} />
      </div>
    </div>
  );
}
