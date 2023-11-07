"use client";
import React, { useEffect, useRef, useState } from "react";

const Infographic = () => {
  let animationRef = useRef<HTMLOListElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let config = {
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      });
    }, config);

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  // let show = true;
  let processes: string[] = [
    " Introductory Call",
    "Tracking Audit",
    "Data Plan",
    "Plan Execution",
    "Wrap-up Meeting",
  ];
  return (
    <ol ref={animationRef} className="infographic">
      <div className={show ? "enter-up-show rocket" : "enter-up-hidden rocket"}>
        <svg className="w-[var(--rocket-width)] h-[var(--rocket-height)] translate-y-[30px]">
          <use xlinkHref={"./images/sprite.svg#rocket"}></use>
        </svg>
      </div>
      {processes.map((process, index) => (
        <li className={show ? "fade-in-show" : "fade-in-hidden"} key={index}>
          {process}
        </li>
      ))}
    </ol>
  );
};

export default Infographic;
