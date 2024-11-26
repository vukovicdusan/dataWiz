import React from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";
import igor from "../../public/images/IgorK.webp";
import ShapedividerDark from "../ShapedividerDark";
import AnimationContainer from "../AnimationContainer";
import Shapedivider from "../Shapedivider";

const AboutSection = () => {
  return (
    <div>
      <section id="about" className="bg-secondaryAccent">
        <Wrapper>
          <AnimationContainer direction={"fromBottom"}>
            <h2 className="text-5xl font-bold text-center mb-10 uppercase">
              About Me
            </h2>
          </AnimationContainer>
          <div className="flex flex-wrap-reverse justify-between mx-aut lg:flex-wrap ">
            <div className="lg:basis-1/2 md:basis-full justify-start">
              <AnimationContainer direction={"fromBottom"}>
                <p className="mb-4 text-left">
                  Hello, I'm Igor! I'm driven by the 'who' and the 'why' behind
                  every dataset I encounter. With a fusion of analytical prowess
                  and coding skills, I dissect complex data from diverse angles
                  to reveal valuable insights. My mission is to transform raw
                  data into actionable strategies that drive growth.
                </p>
              </AnimationContainer>
              <AnimationContainer direction={"fromBottom"}>
                <p className="mb-4 text-left">
                  I thrive on challenges that push me to think critically and
                  innovate. I've honed my skills in data analysis, allowing me
                  to navigate intricate datasets effortlessly. unveiling hidden
                  patterns and trends that drive informed decision-making.
                </p>{" "}
              </AnimationContainer>
              <AnimationContainer direction={"fromBottom"}>
                <p className="mb-4 text-left">
                  Outside of work, I'm a passionate adventurer at heart.
                  Exploring new places and cultures fuels my sense of curiosity
                  and excitement.
                </p>
              </AnimationContainer>
            </div>
            <div className="lg:basis-1/2 basis-full mb-8 lg:mb-0">
              <AnimationContainer direction={""}>
                <Image
                  className="w-[300px] h-[300px] m-auto rounded-full object-cover"
                  width={300}
                  height={300}
                  src={igor}
                  alt="igor"
                ></Image>
              </AnimationContainer>
            </div>
          </div>
        </Wrapper>
        <ShapedividerDark classProp={"translate-y-1"}></ShapedividerDark>
      </section>
    </div>
  );
};

export default AboutSection;
