"use client";

import { useState } from "react";
import Avatar from "@/components/url-builder/Avatar";
import InviteModal from "@/components/url-builder/InviteModal";
import LeaveTeamDialog from "@/components/url-builder/LeaveTeamDialog";
import type { TeamWithMembers } from "@/lib/url-builder/teams";

const TeamPanel = ({ team }: { team: TeamWithMembers }) => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const memberCount = team.members.length;

  return (
    <section className="w-full max-w-lg rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 shadow-2xl">
      <h1 className="text-2xl font-bold text-white">{team.name}</h1>
      <p className="mt-1 text-sm text-gray-400">
        {memberCount === 1 ? "1 member" : `${memberCount} members`}
      </p>

      <ul className="mt-5 space-y-3">
        {team.members.map((member) => (
          <li key={member.userId} className="flex items-center gap-3">
            <Avatar
              name={member.fullName ?? member.email}
              avatarUrl={member.avatarUrl}
            />
            <span className="text-gray-200">
              {member.fullName
                ? `${member.fullName} (${member.email})`
                : member.email}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsInviteOpen(true)}
          className="rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
        >
          Invite member
        </button>
        <button
          type="button"
          onClick={() => setIsLeaveOpen(true)}
          className="rounded-md border border-secondaryBg/60 px-5 py-2.5 font-bold text-gray-200 transition hover:bg-secondaryBg/30"
        >
          Leave team
        </button>
      </div>

      {isInviteOpen && <InviteModal onClose={() => setIsInviteOpen(false)} />}
      {isLeaveOpen && (
        <LeaveTeamDialog
          teamName={team.name}
          onClose={() => setIsLeaveOpen(false)}
        />
      )}
    </section>
  );
};

export default TeamPanel;
