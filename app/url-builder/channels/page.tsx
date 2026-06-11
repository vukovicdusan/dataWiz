import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileAndTeam,
  getTeamWithMembers,
} from "@/lib/url-builder/teams";
import DashboardHeader from "@/components/url-builder/DashboardHeader";

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
        <section className="w-full max-w-lg rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 text-center shadow-2xl">
          <h1 className="text-2xl font-bold text-white">Channels</h1>
          <p className="mt-3 text-gray-300">
            Channel management is coming soon. You will be able to review and
            customize the UTM templates for each channel right here.
          </p>
        </section>
      </div>
    </div>
  );
}
