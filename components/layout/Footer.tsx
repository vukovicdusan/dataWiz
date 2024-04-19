import React from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";
import logo from "../../public/images/full-logo-blue.png";
import AnimationContainer from "../AnimationContainer";

const Footer = () => {
  let date = new Date().getFullYear();
  return (
    <footer className="pt-4 px-4 bg-secondaryAccent">
      <Wrapper>
        <AnimationContainer direction={"fromTop"}>
          <div className="flex flex-col gap-8 items-center pb-20">
            <Image alt="logo" src={logo} width={200}></Image>
            <ul className="flex gap-8">
              <li>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://www.upwork.com/freelancers/knezevicigor"
                >
                  <svg className="w-[50px] h-[50px] shrink-0 hover:-translate-y-2 transition-transform duration-200">
                    <use xlinkHref={`./images/sprite.svg#upwork`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61558462116754"
                >
                  <svg className="w-[50px] h-[50px] shrink-0 hover:-translate-y-2 transition-transform duration-200">
                    <use xlinkHref={`./images/sprite.svg#facebook`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://www.instagram.com/thedatawizanalytics/"
                >
                  <svg className="w-[50px] h-[50px] shrink-0 hover:-translate-y-2 transition-transform duration-200">
                    <use xlinkHref={`./images/sprite.svg#instagram`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://www.linkedin.com/company/datawiz-analytics/"
                >
                  <svg className="w-[50px] h-[50px] shrink-0 hover:-translate-y-2 transition-transform duration-200">
                    <use xlinkHref={`./images/sprite.svg#linkedin`}></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </AnimationContainer>
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
