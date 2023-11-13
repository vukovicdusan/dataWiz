import React from "react";
import TestimonialSlider from "../TestimonialSlider";
import Wrapper from "../Wrapper";
import AnimationContainer from "../AnimationContainer";

const Testimonials = () => {
  return (
    <Wrapper>
      <section className="flex sm:flex-row flex-col my-20">
        <div className="flex justify-center items-center sm:w-1/4 mb-8 sm:mb-0">
          <AnimationContainer direction={"fromLeft"}>
            <h2 className="text-5xl font-bold text-center sm:text-left">
              Our <span className="text-primaryAccent">Happy</span> <br></br>
              Users
            </h2>
          </AnimationContainer>
        </div>
        <div className="w-full sm:w-3/4 relative">
          <AnimationContainer direction={"fromRight"}>
            <TestimonialSlider />
          </AnimationContainer>
        </div>
      </section>
    </Wrapper>
  );
};

export default Testimonials;
