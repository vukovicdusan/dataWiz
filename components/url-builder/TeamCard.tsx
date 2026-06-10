import Avatar from "@/components/url-builder/Avatar";
import type { TeamWithMembers } from "@/lib/url-builder/teams";

const TeamCard = ({ team }: { team: TeamWithMembers }) => {
  const memberCount = team.members.length;

  return (
    <section className="w-full max-w-lg rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white">{team.name}</h2>
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
              {member.fullName ?? member.email}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeamCard;
