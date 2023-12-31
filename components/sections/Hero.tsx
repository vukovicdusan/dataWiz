import Image from "next/image";
import React from "react";
import rocket from "../../public/images/rocket-hero.svg";
import Button from "../Button";
import Wrapper from "../Wrapper";
import AnimationContainer from "../AnimationContainer";
import BackgroundLight from "../BackgroundLight";

const Hero = () => {
  return (
    <Wrapper>
      <div className="stars"></div>
      <section className="relative flex flex-wrap justify-center items-center mx-auto gap-8 sm:gap-0 md:h-[50vh] pt-10 mt-10">
        <div className="md:basis-1/2 basis-full ">
          <AnimationContainer direction={"fromRight"}>
            <h1 className="text-5xl mb-5 font-bold uppercase">
              <span className="text-primaryAccent">Enhance</span> Insights About
              Your <span className="text-primaryAccent">Web Users</span>
            </h1>
          </AnimationContainer>
          <AnimationContainer direction={"fromTop"} delay={"delay-300"}>
            <p className="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              dapibus auctor tempor. Vivamus sit amet sapien pellentesque,
              luctus lorem rhoncus, bibendum erat. In iaculis aliquam neque,
              ultricies tempor enim tincidunt sit amet. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
          </AnimationContainer>
          <AnimationContainer direction={"fromBottom"}>
            <Button>Get your free audit</Button>
          </AnimationContainer>
        </div>
        <div className="relative md:basis-1/2 basis-full">
          <AnimationContainer direction={""} delay={"200"}>
            <Image
              className="m-auto"
              width={400}
              height={400}
              src={rocket}
              alt="rocket"
            ></Image>
          </AnimationContainer>
          <BackgroundLight
            width={"w-[80%]"}
            height={"h-[80%]"}
          ></BackgroundLight>
        </div>
      </section>
    </Wrapper>
  );
};

export default Hero;
