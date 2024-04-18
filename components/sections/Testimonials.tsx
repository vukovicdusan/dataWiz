import React from "react";
import TestimonialSlider from "../TestimonialSlider";
import Wrapper from "../Wrapper";
import AnimationContainer from "../AnimationContainer";
import Image from "next/image";
import logo from "@/public/images/logo-hat-star.png";

const Testimonials = () => {
  return (
    <Wrapper>
      <section id="testimonials">
        <AnimationContainer direction={"fromLeft"}>
          <h2 className="text-5xl font-bold text-center uppercase">
            Don't Just Take My Word <br></br>
            For It:
          </h2>
        </AnimationContainer>
        <div className="flex sm:flex-row flex-col my-20">
          <AnimationContainer direction={"fromLeft"}>
            <Image
              alt="logo"
              className="object-contain w-full h-full hidden sm:block"
              src={logo}
            ></Image>
          </AnimationContainer>
          <div className="flex justify-center items-center sm:w-1/4 mb-8 sm:mb-0"></div>
          <div className="w-full sm:w-3/4 relative">
            <AnimationContainer direction={"fromRight"}>
              <TestimonialSlider />
            </AnimationContainer>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Testimonials;
