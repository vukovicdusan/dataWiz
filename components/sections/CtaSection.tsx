import Image from "next/image";
import React from "react";
import Button from "../Button";
import rocket from "../../public/images/rocket-cta.svg";
import Wrapper from "../Wrapper";
import CtaForm from "../CtaForm";

const CtaSection = () => {
  return (
    <div className="bg-secondaryAccent">
      <Wrapper>
        <h2 className="text-5xl text-center mb-10 font-bold">
          Improve your<span className="text-primaryAccent"> data quality</span>
        </h2>
        <section className="flex flex-wrap-reverse justify-between mx-auto bg-secondaryAccent lg:flex-wrap">
          <div className="lg:basis-1/2 md:basis-full">
            <Image src={rocket} alt="rocket"></Image>
          </div>
          <div className="lg:basis-1/2 md:basis-full">
            <CtaForm></CtaForm>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default CtaSection;
