import Image from "next/image";
import React from "react";
import rocket from "../../public/images/rocket-hero.svg";
import Wrapper from "../Wrapper";
import AnimationContainer from "../AnimationContainer";
import BackgroundLight from "../BackgroundLight";
import ButtonLink from "../ButtonLink";
import HeroCta from "../HeroCta";

const Hero = () => {
  return (
    <Wrapper>
      <div className="stars"></div>
      <section className="relative flex flex-wrap justify-center items-center mx-auto gap-8 sm:gap-0 md:h-[50vh] pt-10 mt-10">
        <div className="md:basis-1/2 basis-full ">
          <AnimationContainer direction={"fromRight"}>
            <h1 className="text-5xl mb-5 font-bold uppercase">
              Transform <span className="text-primaryAccent">data</span> into{" "}
              <span className="text-primaryAccent">dollars</span>
            </h1>
          </AnimationContainer>
          <AnimationContainer direction={"fromTop"} delay={"delay-300"}>
            <p className="mb-5 text-lg">
              Your success, decoded. Decipher your data with the help of a
              seasoned web analyst to create a roadmap for growth
            </p>
          </AnimationContainer>
          <AnimationContainer direction={"fromBottom"}>
            <HeroCta></HeroCta>
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
