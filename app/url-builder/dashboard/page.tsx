import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import DashboardHeader from "@/components/url-builder/DashboardHeader";
import TeamCard from "@/components/url-builder/TeamCard";

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
        teamName={team.name}
      />
      <div className="flex flex-col items-center px-4 py-12">
        <TeamCard team={team} />
      </div>
    </div>
  );
}
