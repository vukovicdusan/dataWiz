import React from "react";
import logo from "../public/images/logo-generic.svg";
import Image from "next/image";

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto">
      <Image src={logo} alt="logo" width={150}></Image>
    </header>
  );
};

export default Header;
