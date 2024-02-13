import React from "react";
import AnimationContainer from "@/components/AnimationContainer";
import Wrapper from "@/components/Wrapper";

const InfoSection = () => {
  return (
    <div className="bg-secondaryAccent">
      <Wrapper>
        <section className="flex flex-wrap-reverse justify-between mx-auto bg-secondaryAccent lg:flex-wrap py-1">
          <div className="lg:basis-1/2 md:basis-full justify-start mb-5">
            <AnimationContainer direction={"fromRight"}>
              <p className="mb-5 text-left">
                <span className="text-xl font-bold">
                  Welcome to <span className="text-primaryAccent">DataWiz</span>
                  ,&nbsp;
                </span>
                where data meets insight and transforms your digital world. At
                our web analytics agency, we don&apos;t just crunch numbers; we
                decipher stories, unravel trends, and illuminate the path to
                your online success. In the ever-evolving landscape of the
                internet, understanding your audience is not just an advantage –
                it&apos;s imperative.
              </p>
              <p className="mb-5 text-left">
                With us, you&apos;re not just getting analytics; you&apos;re
                gaining a profound understanding of your web users. Dive into
                the heart of your data with our expert team, and let&apos;s turn
                clicks into meaningful connections and visits into conversions.
              </p>
              <p className="mb-5 text-left font-bold">
                Your journey to unrivaled digital intelligence starts here.
              </p>
            </AnimationContainer>
          </div>
          <div className="lg:basis-1/2 md:basis-full ">
            <AnimationContainer direction={"fromRight"} delay={"delay-200"}>
              <h2 className="text-5xl mb-5 font-bold text-right ">
                Your journey to{" "}
                <span className="text-primaryAccent">unrivaled</span> digital
                intelligence starts{" "}
                <span className="text-primaryAccent">here.</span>
              </h2>
            </AnimationContainer>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default InfoSection;
