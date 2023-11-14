import React from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";
import logo from "../../public/images/logo-generic.svg";

const Footer = () => {
  let date = new Date().getFullYear();
  return (
    <footer className="pt-4 px-4">
      <Wrapper>
        <div className="flex flex-col gap-8 items-center pb-20">
          <Image alt="logo" src={logo} width={300}></Image>
          <ul className="flex gap-8">
            <li>
              <a href="www.google.com">
                <svg className="w-[50px] h-[50px] shrink-0 hover:-translate-y-2 transition-transform duration-200">
                  <use xlinkHref={`./images/sprite.svg#facebook`}></use>
                </svg>
              </a>
            </li>
            <li>
              <a href="www.google.com">
                <svg className="w-[50px] h-[50px] shrink-0 hover:-translate-y-2 transition-transform duration-200">
                  <use xlinkHref={`./images/sprite.svg#instagram`}></use>
                </svg>
              </a>
            </li>
            <li>
              <a href="www.google.com">
                <svg className="w-[50px] h-[50px] shrink-0 hover:-translate-y-2 transition-transform duration-200">
                  <use xlinkHref={`./images/sprite.svg#linkedin`}></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs text-center text-gray-400">
            Copyright © dataWiz {date}
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
