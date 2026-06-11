import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import { getTeamHistory } from "@/lib/url-builder/history";
import { getTeamChannelLabels } from "@/lib/url-builder/teamChannels";
import type { HistoryEntry } from "@/lib/history/types";
import DashboardHeader from "@/components/url-builder/DashboardHeader";
import HistoryCard from "@/components/url-builder/history/HistoryCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "History | DataWiz URL Builder",
};

export default async function UrlBuilderHistoryPage() {
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

  // History load failures must not blank the page: the card shows its own
  // error state instead (same pattern the dashboard used).
  // Label load failures also must not blank History; fall back to {}.
  const [historyResult, teamChannelLabels] = await Promise.all([
    getTeamHistory().then(
      (entries) => ({ entries, failed: false }),
      (error) => {
        console.error("Could not load team history:", error);
        return { entries: [] as HistoryEntry[], failed: true };
      }
    ),
    getTeamChannelLabels(supabase, team.id).catch((error) => {
      console.error("Could not load team channel labels:", error);
      return {} as Record<string, string>;
    }),
  ]);

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
        <div className="w-full max-w-6xl">
          <HistoryCard
            entries={historyResult.entries}
            loadFailed={historyResult.failed}
            teamChannelLabels={teamChannelLabels}
          />
        </div>
      </div>
    </div>
  );
}
