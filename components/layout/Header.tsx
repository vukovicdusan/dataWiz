import React from "react";
import logo from "../../public/images/logo-generic.svg";
import Image from "next/image";
import Wrapper from "../Wrapper";

const Header = () => {
  // function navHandler() {}
  return (
    <header className="mx-auto py-4 mb-10">
      <Wrapper>
        <div className="flex justify-between items-center relative">
          <Image src={logo} alt="logo" width={150}></Image>
          <nav className="fixed sm:relative bottom-0 right-0 pl-10 pr-4 py-2  h-full w-max flex items-end z-30 backdrop-blur-lg">
            <ul className="flex gap-3 flex-wrap sm:flex-nowrap flex-col sm:flex-row">
              <li>
                <a
                  className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
                  href="#services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
                  href="#process"
                >
                  My Process
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
                  href="#cta"
                >
                  Audit
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
                  href="#testimonials"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
                  href="#faq"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
                  href="#about"
                >
                  About Me
                </a>
              </li>
            </ul>
          </nav>
          <button
            className="absolute top-0 right-0 w-max h-max z-30 flex flex-col gap-[6px]"
            // aria-expanded={open}
            // aria-controls="accordion-content"
            // onClick={navHandler}
          >
            <span className="block h-[1px] w-6 bg-white"></span>
            <span className="block h-[1px] w-6 bg-white"></span>
            <span className="block h-[1px] w-6 bg-white"></span>
          </button>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
