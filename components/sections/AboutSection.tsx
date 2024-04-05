import React from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";
import rocket from "../../public/images/rocket-about.svg";
import ShapedividerDark from "../ShapedividerDark";
import AnimationContainer from "../AnimationContainer";

const AboutSection = () => {
  return (
    <div className="bg-secondaryAccent">
      <Wrapper>
        <section id="about" className="bg-secondaryAccent">
          <AnimationContainer direction={"fromBottom"}>
            <h2 className="text-5xl font-bold text-center mb-10 uppercase">
              About <span className="text-primaryAccent">Me</span>
            </h2>
          </AnimationContainer>
          <div className="flex flex-wrap-reverse justify-between mx-aut lg:flex-wrap ">
            <div className="lg:basis-1/2 md:basis-full justify-start">
              <AnimationContainer direction={"fromBottom"}>
                <p className="mb-4 text-left">
                  Hello, I'm
                  <span className="text-primaryAccent font-bold"> Igor! </span>
                  I'm driven by the 'who' and the 'why' behind every dataset I
                  encounter. My blend of analytical prowess and coding skills
                  allows me to approach complex data from various angles,
                  piecing together the puzzle to uncover valuable insights.
                  Ultimately, my mission is to transform raw data into
                  actionable strategies that drive tangible value.
                </p>
              </AnimationContainer>
              <AnimationContainer direction={"fromBottom"}>
                <p className="mb-4 text-left">
                  Professionally, I thrive on challenges that push me to think
                  critically and innovate. I've honed my skills in data
                  analysis, allowing me to navigate intricate datasets with
                  ease. By dissecting information from various perspectives, I
                  uncover hidden patterns and trends that drive informed
                  decision-making.
                </p>{" "}
              </AnimationContainer>
              <AnimationContainer direction={"fromBottom"}>
                <p className="mb-4 text-left">
                  Outside of work, I'm a passionate adventurer at heart.
                  Exploring new places and cultures fuels my sense of curiosity
                  and excitement. Whether I'm planning my next trip or immersing
                  myself in a new destination, I cherish the thrill of discovery
                  and the opportunity to broaden my horizons.
                </p>
              </AnimationContainer>
            </div>
            <div className="lg:basis-1/2 basis-full mb-8 lg:mb-0">
              <AnimationContainer direction={""}>
                <Image
                  className="m-auto"
                  width={300}
                  height={300}
                  src={rocket}
                  alt="rocket"
                ></Image>
              </AnimationContainer>
            </div>
          </div>
        </section>
      </Wrapper>
      <ShapedividerDark classProp={"translate-y-1"}></ShapedividerDark>
    </div>
  );
};

export default AboutSection;
