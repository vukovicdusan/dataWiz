"use client";
import React, { useState } from "react";
import AnimationContainer from "./AnimationContainer";
import FaqItem from "./FaqItem";
// import Button from "./Button";

type FaqType = {
  title: string;
  body: string;
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
      <button onClick={() => setLimit(limit + 3)}>Show More</button>
    </>
  );
};

export default FaqsLimiter;
