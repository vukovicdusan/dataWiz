import Image from "next/image";
import React from "react";
import rocket from "../../public/images/rocket-hero.svg";
import Button from "../Button";
import Wrapper from "../Wrapper";

const Hero = () => {
  return (
    <Wrapper>
      <section className="flex flex-wrap mx-auto gap-8 sm:gap-0">
        <div className="md:basis-1/2 basis-full ">
          <h1 className="text-5xl mb-5 font-bold">
            <span className="text-primaryAccent">Enhance</span> Insights About
            Your <span className="text-primaryAccent">Web Users</span>
          </h1>
          <p className="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            dapibus auctor tempor. Vivamus sit amet sapien pellentesque, luctus
            lorem rhoncus, bibendum erat. In iaculis aliquam neque, ultricies
            tempor enim tincidunt sit amet. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.
          </p>
          <Button>Get your free audit</Button>
        </div>
        <div className="md:basis-1/2 basis-full">
          <Image
            className="m-auto"
            width={400}
            height={400}
            src={rocket}
            alt="rocket"
          ></Image>
        </div>
      </section>
    </Wrapper>
  );
};

export default Hero;
