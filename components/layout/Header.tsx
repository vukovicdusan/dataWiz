import React from "react";
import logo from "../../public/images/logo-generic.svg";
import Image from "next/image";
import Wrapper from "../Wrapper";

const Header = () => {
  return (
    <header className="mx-auto py-4 mb-10">
      <Wrapper>
        <Image src={logo} alt="logo" width={150}></Image>
      </Wrapper>
    </header>
  );
};

export default Header;
