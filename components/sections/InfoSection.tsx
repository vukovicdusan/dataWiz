import React from "react";
import AnimationContainer from "@/components/AnimationContainer";
import Wrapper from "@/components/Wrapper";

const InfoSection = () => {
  return (
    <div className="bg-secondaryAccent">
      <Wrapper>
        <section className="bg-secondaryAccent lg:flex-wrap py-1">
          <div className="flex flex-wrap-reverse justify-between mx-auto mb-20">
            <div className="lg:basis-1/2 md:basis-full justify-start mb-5">
              <AnimationContainer direction={"fromRight"}>
                <p className="mb-5 text-left">
                  <span className="text-xl font-bold">
                    Welcome to{" "}
                    <span className="text-primaryAccent">DataWiz</span>
                    ,&nbsp;
                  </span>
                  where data meets insight and transforms your digital world. At
                  our web analytics agency, we don&apos;t just crunch numbers;
                  we decipher stories, unravel trends, and illuminate the path
                  to your online success. In the ever-evolving landscape of the
                  internet, understanding your audience is not just an advantage
                  – it&apos;s imperative.
                </p>
                <p className="mb-5 text-left">
                  With us, you&apos;re not just getting analytics; you&apos;re
                  gaining a profound understanding of your web users. Dive into
                  the heart of your data with our expert team, and let&apos;s
                  turn clicks into meaningful connections and visits into
                  conversions.
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
          </div>
          <div className="switcher gap-10 justify-center mb-20">
            <div className="text-center">
              <p className="text-5xl font-bold text-primaryAccent mb-2">200+</p>
              <p className="font-bold">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-primaryAccent mb-2">6y</p>
              <p className="font-bold">Of Experience</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-primaryAccent mb-2">300+</p>
              <p className="font-bold">Audits</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-primaryAccent mb-2">150+</p>
              <p className="font-bold">Clients</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="grow shrink basis-[calc((40rem-100%)*999)]">
              <h3 className="text-2xl font-bold mb-5">
                Programming prowess meets{" "}
                <span className="text-primaryAccent">marketing finess </span>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                dolor alias facere quia voluptate rerum quam enim minima non
                asperiores, ipsa obcaecati maxime, accusamus amet temporibus
                commodi adipisci distinctio velit. Aliquid deleniti itaque
                debitis ad ab laudantium dolores, placeat eaque.
              </p>
            </div>
            <div className="grow shrink basis-[calc((40rem-100%)*999)]">
              <h3 className="text-2xl font-bold mb-5">
                Someone that <span className="text-primaryAccent">cares</span>{" "}
                for your business, doesn't treat you like one of the accounts
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                libero optio quasi assumenda alias sit ipsa iste illum odit, rem
                placeat suscipit similique voluptatum, quo, eius repellat. Fugit
                nobis placeat, laboriosam voluptatibus magnam iste.
              </p>
            </div>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default InfoSection;
