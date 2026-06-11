import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import { getTeamChannels } from "@/lib/url-builder/teamChannels";
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

  const { channels } = await getTeamChannels(supabase, team.id);

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
          <ChannelsManager initialChannels={channels} />
        </div>
      </div>
    </div>
  );
}
