import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import InviteJoinCard from "@/components/url-builder/InviteJoinCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team invite | DataWiz URL Builder",
  robots: { index: false, follow: false },
};

const TokenSchema = z.string().regex(/^[A-Za-z0-9_-]{20,128}$/);

function InviteCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 text-center shadow-2xl backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}

function InviteErrorCard({ message }: { message: string }) {
  return (
    <InviteCard>
      <h1 className="text-3xl font-bold text-white">Team invite</h1>
      <p className="mt-3 text-gray-300">{message}</p>
      <Link
        href="/url-builder"
        className="mt-7 inline-block rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80"
      >
        Go to the URL Builder
      </Link>
    </InviteCard>
  );
}

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const parsedToken = TokenSchema.safeParse(params.token);
  if (!parsedToken.success) {
    return (
      <InviteErrorCard message="This invite link is not valid. Ask your teammate to send it again." />
    );
  }

  // Signed-out visitors cannot read invites through RLS, so the lookup uses
  // the service-role client. Only the team's name is exposed to the page.
  const admin = createAdminClient();
  const { data: invite, error: inviteError } = await admin
    .from("invites")
    .select("team_id, revoked, expires_at")
    .eq("token", parsedToken.data)
    .maybeSingle();
  if (inviteError) {
    throw new Error(`Could not look up the invite: ${inviteError.message}`);
  }

  if (!invite) {
    return (
      <InviteErrorCard message="This invite link is not valid. Ask your teammate to send it again." />
    );
  }
  if (invite.revoked) {
    return (
      <InviteErrorCard message="This invite link was replaced by a newer one. Ask your teammate for the latest link." />
    );
  }
  if (new Date(invite.expires_at as string) < new Date()) {
    return (
      <InviteErrorCard message="This invite link has expired. Ask your teammate to generate a new one." />
    );
  }

  const inviteTeamId = invite.team_id as string;

  const { data: team, error: teamError } = await admin
    .from("teams")
    .select("name")
    .eq("id", inviteTeamId)
    .maybeSingle();
  if (teamError) {
    throw new Error(`Could not look up the team: ${teamError.message}`);
  }
  if (!team) {
    return (
      <InviteErrorCard message="The team behind this invite no longer exists." />
    );
  }

  const teamName = team.name as string;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let currentTeamName: string | null = null;
  if (user) {
    const { data: membership } = await admin
      .from("team_members")
      .select("team_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (membership && (membership.team_id as string) === inviteTeamId) {
      // Already a member: opening your own team's invite is a no-op.
      redirect("/url-builder/dashboard");
    }

    if (membership) {
      const { data: currentTeam } = await admin
        .from("teams")
        .select("name")
        .eq("id", membership.team_id as string)
        .maybeSingle();
      currentTeamName = (currentTeam?.name as string | undefined) ?? null;
    }
  }

  return (
    <InviteCard>
      <h1 className="text-3xl font-bold text-white">
        You&apos;ve been invited to join {teamName}
      </h1>
      <InviteJoinCard
        token={parsedToken.data}
        teamName={teamName}
        isSignedIn={!!user}
        currentTeamName={currentTeamName}
      />
    </InviteCard>
  );
}
