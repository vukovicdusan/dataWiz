import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo-hat-star.png";
import UserMenu from "@/components/url-builder/UserMenu";
import BuilderNav from "@/components/url-builder/BuilderNav";

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
    <>
      <header
        aria-labelledby="builder-header-title"
        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 sm:px-8"
      >
        <Link href="/" aria-label="DataWiz home">
          <Image
            src={logo}
            alt="DataWiz logo"
            width={80}
            className="w-[40px] sm:w-[50px]"
          />
        </Link>
        <p
          id="builder-header-title"
          className="text-center text-base font-bold text-white sm:text-2xl"
        >
          DataWiz URL Builder
        </p>
        <UserMenu
          name={name}
          email={email}
          avatarUrl={avatarUrl}
        />
      </header>
      <BuilderNav />
    </>
  );
};

export default DashboardHeader;
