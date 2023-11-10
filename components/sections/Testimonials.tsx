import React from "react";
import TestimonialSlider from "../TestimonialSlider";
import Wrapper from "../Wrapper";

const Testimonials = () => {
  return (
    <Wrapper>
      <section className="flex sm:flex-row flex-col">
        <div className="flex justify-center items-center sm:w-1/4 mb-8 sm:mb-0">
          <h2 className="text-5xl font-bold">
            Our <span className="text-primaryAccent">Happy</span> <br></br>Users
          </h2>
        </div>
        <div className="w-full sm:w-3/4 relative">
          <TestimonialSlider />
        </div>
      </section>
    </Wrapper>
  );
};

export default Testimonials;
