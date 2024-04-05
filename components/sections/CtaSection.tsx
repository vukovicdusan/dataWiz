"use client";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
// import rocket from "../../public/images/rocket-cta.svg";
import Wrapper from "../Wrapper";
import CtaForm from "../CtaForm";
import AnimationContainer from "../AnimationContainer";
import { usePathname } from "next/navigation";

let auditCta = {
  id: "audit",
  title: "Free Audit: Get More Data. Better Data.",
  subtitle:
    "The only thing worse than not being data-driven is being driven by bad data.",
  list: [
    "Let's talk, and I’ll help you get:",
    "More higher quality data to optimize website, user journey and marketing.",
    "Enhanced ad performance.",
    "Future-proof analytic setup.",
    "Clean and easy-to-manage setup.",
  ],
  ctaButton: "Get your free audit",
};

let consultationCta = {
  id: "consultation",
  title: "Free Consultation: Big things start with small talk.",
  subtitle:
    "Let’s unpack your business and explore how can I help achieve your goals.",
  list: [
    "I will help you:",
    "Spot and fix issues in your current setup",
    "Identify areas of improvement",
    "Outline the implementation plan",
    "Answer all your questions",
  ],
  ctaButton: "Start Your Success Story",
};

const CtaSection = () => {
  const [ctaContent, setCtaContent] = useState(auditCta);
  const pathname = usePathname();

  useEffect(() => {
    const url = `${pathname}`;
    url === "/consultation"
      ? setCtaContent(consultationCta)
      : setCtaContent(auditCta);
  }, [pathname]);

  let ctaTitleArr = ctaContent.title.split(" ");
  let firstSection = ctaTitleArr[0] + " " + ctaTitleArr[1];
  let lastSection = ctaTitleArr.slice(2, ctaTitleArr.length).join(" ");
  return (
    <section id="form" className="relative bg-secondaryAccent py-4 z-10">
      <Wrapper>
        <div className="mb-10">
          <div className="flex gap-8 items-center justify-center relative">
            <AnimationContainer direction={"fromBottom"}>
              <h2 className="text-5xl text-center mb-4 font-bold uppercase">
                <span className="text-primaryAccent">{firstSection + " "}</span>
                {lastSection}
              </h2>
            </AnimationContainer>
          </div>
          <AnimationContainer direction={"fromTop"}>
            <p className="text-xl text-center">{ctaContent.subtitle}</p>
          </AnimationContainer>
        </div>
        <div className="flex flex-wrap-reverse sm:flex-nowrap gap-8 sm:gap-0 justify-center sm:justify-between mx-auto bg-secondaryAccent ">
          <div className="lg:basis-1/2 basis-full">
            <AnimationContainer direction={"fromLeft"}>
              <CtaForm {...ctaContent}></CtaForm>
            </AnimationContainer>
          </div>
          <div className="lg:basis-1/2 basis-full">
            <AnimationContainer direction={""}>
              <ul className="ml-8">
                {ctaContent.list.map((item, index) => (
                  <li
                    className={`flex gap-2 text-lg mb-2 max-w-[40ch] ${
                      index === 0 ? "font-bold mb-4" : ""
                    }`}
                    key={index}
                  >
                    <svg
                      className={`w-[24px] h-[24px] mt-1 shrink-0 ${
                        index === 0 ? "hidden" : ""
                      }`}
                    >
                      <use xlinkHref={`./images/sprite.svg#dot-line`}></use>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              {/* <Image
                className="m-auto"
                width={300}
                height={300}
                src={rocket}
                alt="rocket"
              ></Image> */}
            </AnimationContainer>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CtaSection;
