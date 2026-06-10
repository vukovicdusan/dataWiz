import { randomBytes } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export type InviteLink = {
  token: string;
  expiresAt: string;
};

const INVITE_VALID_DAYS = 7;

// 32 random bytes, base64url -> 43-char token. The link is the only secret.
export function generateInviteToken(): string {
  return randomBytes(32).toString("base64url");
}

export async function findActiveInvite(
  teamId: string
): Promise<InviteLink | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("invites")
    .select("token, expires_at")
    .eq("team_id", teamId)
    .eq("revoked", false)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (error) {
    throw new Error(`Could not look up the invite link: ${error.message}`);
  }
  if (!data) return null;
  return { token: data.token as string, expiresAt: data.expires_at as string };
}

// Revokes every non-revoked invite for the team, then creates a fresh one.
// (The partial unique index on invites enforces one active link per team.)
export async function replaceInvite(
  teamId: string,
  createdBy: string
): Promise<InviteLink> {
  const admin = createAdminClient();

  const { error: revokeError } = await admin
    .from("invites")
    .update({ revoked: true })
    .eq("team_id", teamId)
    .eq("revoked", false);
  if (revokeError) {
    throw new Error(`Could not revoke old invite links: ${revokeError.message}`);
  }

  const token = generateInviteToken();
  const expiresAt = new Date(
    Date.now() + INVITE_VALID_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const { error: insertError } = await admin.from("invites").insert({
    team_id: teamId,
    token,
    created_by: createdBy,
    expires_at: expiresAt,
  });
  if (insertError) {
    throw new Error(`Could not create the invite link: ${insertError.message}`);
  }

  return { token, expiresAt };
}
