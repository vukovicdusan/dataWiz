import Image from "next/image";
import React from "react";
import rocket from "../public/images/rocket-hero.svg";

const Hero = () => {
  return (
    <div className="max-w-7xl flex flex-wrap mx-auto">
      <div className="lg:basis-1/2 md:basis-full">
        <h1 className="text-5xl">
          <span className="text-primaryAccent">Enhance</span> Insights About
          Your <span className="text-primaryAccent">Web Users</span>
        </h1>
      </div>
      <div className="lg:basis-1/2 md:basis-full">
        <Image src={rocket} alt="rocket"></Image>
      </div>
    </div>
  );
};

export default Hero;
