import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import { getTeamChannels, type ResolvedChannel } from "@/lib/url-builder/teamChannels";
import DashboardHeader from "@/components/url-builder/DashboardHeader";
import ChannelsManager from "@/components/url-builder/channels/ChannelsManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Channels | DataWiz URL Builder",
};

export default async function UrlBuilderChannelsPage() {
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

  // Channel load failures must not blank the page: render an inline error
  // card instead so the rest of the UI (header, layout) stays intact.
  const channelsResult = await getTeamChannels(supabase, team.id).then(
    (result) => ({ channels: result.channels, failed: false }),
    (error) => {
      console.error("Could not load team channels:", error);
      return { channels: [] as ResolvedChannel[], failed: true };
    }
  );

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
        <div className="w-full max-w-3xl">
          {channelsResult.failed ? (
            <div className="rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-6">
              <h1 className="text-2xl font-bold text-white">Channels</h1>
              <p role="alert" className="mt-3 text-sm text-red-300">
                Could not load your channels. Please reload the page.
              </p>
            </div>
          ) : (
            <ChannelsManager initialChannels={channelsResult.channels} />
          )}
        </div>
      </div>
    </div>
  );
}
