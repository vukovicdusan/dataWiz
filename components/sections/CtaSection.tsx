import Image from "next/image";
import React from "react";
import Button from "../Button";
import rocket from "../../public/images/rocket-cta.svg";
import Wrapper from "../Wrapper";
import CtaForm from "../CtaForm";
import AnimationContainer from "../AnimationContainer";

const CtaSection = () => {
  return (
    <div className="relative bg-secondaryAccent py-4 z-10">
      <Wrapper>
        <div className="mb-10">
          <AnimationContainer direction={"fromBottom"}>
            <h2 className="text-5xl text-center mb-4 font-bold">
              Improve your
              <span className="text-primaryAccent"> data quality</span>
            </h2>
            <AnimationContainer direction={"fromTop"}>
              <p className="text-lg text-center">
                Contact us because we are the best in the world.
              </p>
            </AnimationContainer>
          </AnimationContainer>
        </div>
        <section className="flex flex-wrap-reverse sm:flex-nowrap gap-8 sm:gap-0 justify-center sm:justify-between mx-auto bg-secondaryAccent ">
          <div className="lg:basis-1/2 basis-full">
            <AnimationContainer direction={"fromRight"}>
              <Image
                className="m-auto"
                width={300}
                height={300}
                src={rocket}
                alt="rocket"
              ></Image>
            </AnimationContainer>
          </div>
          <div className="lg:basis-1/2 basis-full">
            <AnimationContainer direction={"fromLeft"}>
              <CtaForm></CtaForm>
            </AnimationContainer>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default CtaSection;
