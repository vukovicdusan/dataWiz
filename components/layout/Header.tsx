import React from "react";
import logo from "../../public/images/logo-hat-star.png";
import Image from "next/image";
import Wrapper from "../Wrapper";
import TopNavigation from "../TopNavigation";

const Header = () => {
  const linksArr = [
    { link: "#kpis", name: "What sets me apart" },
    { link: "#services", name: "Services" },
    { link: "#industries", name: "Expertise" },
    { link: "#process", name: "My Process" },
    { link: "#cta", name: "Contact" },
    { link: "#testimonials", name: "Reviews" },
    // { link: "#faq", name: "FAQ" },
    { link: "#about", name: "About Me" },
  ];

  return (
    <header className="relative top-0 left-0 right-0 mx-auto py-4 z-30">
      <Wrapper>
        <div className="flex justify-between items-center relative">
          <Image
            src={logo}
            alt="logo"
            width={80}
            className="w-[50px] sm:w-[80px]"
          ></Image>
          <TopNavigation links={linksArr}></TopNavigation>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
