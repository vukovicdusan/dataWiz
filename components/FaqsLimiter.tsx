"use client";
import React, { useState } from "react";
import AnimationContainer from "./AnimationContainer";
import FaqItem from "./FaqItem";
// import Button from "./Button";

type FaqType = {
  title: string;
  body: React.ReactNode;
};

const FaqsLimiter: React.FC<{ faqs: FaqType[] }> = ({ faqs }) => {
  const [limit, setLimit] = useState<number>(3);
  return (
    <>
      {faqs.slice(0, limit).map((faq, index) => (
        <AnimationContainer
          key={index}
          direction={"fromBottom"}
          delay={"delay-" + index + "00"}
        >
          <FaqItem body={faq.body} title={faq.title}></FaqItem>
        </AnimationContainer>
      ))}
      {faqs.length === limit || faqs.length > limit ? (
        <button
          className="flex gap-2 items-center text-left mx-auto text-primaryAccent"
          onClick={() => setLimit(limit + 3)}
        >
          Show More
          <svg className="w-[20px] h-[20px] fill-primaryAccent">
            <use xlinkHref={`./images/sprite.svg#plus`}></use>
          </svg>
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default FaqsLimiter;
