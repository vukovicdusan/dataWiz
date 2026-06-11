import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo-hat-star.png";
import UserMenu from "@/components/url-builder/UserMenu";

type DashboardHeaderProps = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

const DashboardHeader = ({
  name,
  email,
  avatarUrl,
}: DashboardHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 sm:px-8">
      <Link href="/" aria-label="DataWiz home">
        <Image
          src={logo}
          alt="DataWiz logo"
          width={80}
          className="w-[40px] sm:w-[50px]"
        />
      </Link>
      <UserMenu
        name={name}
        email={email}
        avatarUrl={avatarUrl}
      />
    </header>
  );
};

export default DashboardHeader;
