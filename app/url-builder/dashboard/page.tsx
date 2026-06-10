import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import SignOutButton from "@/components/url-builder/SignOutButton";
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

  return (
    <div className="flex min-h-[60vh] flex-col items-center px-4 py-16">
      <TeamCard team={team} />
      <div className="mt-7">
        <SignOutButton />
      </div>
    </div>
  );
}
