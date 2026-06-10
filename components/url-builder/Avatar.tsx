import Image from "next/image";

type AvatarProps = {
  name: string;
  avatarUrl: string | null;
  size?: number;
};

const Avatar = ({ name, avatarUrl, size = 36 }: AvatarProps) => {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full bg-primaryAccent font-bold text-white"
      style={{ width: size, height: size }}
    >
      {name.charAt(0).toUpperCase() || "?"}
    </span>
  );
};

export default Avatar;
