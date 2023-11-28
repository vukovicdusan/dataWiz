"use client";
import React, { useEffect, useRef, useState } from "react";

type TServiceTooltipElement = {
  title: string;
  content: string;
};

const ServiceTooltipElement = (props: TServiceTooltipElement) => {
  const [tooltipShow, setTooltipShow] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const mouseEnterHandler = () => {
    setTooltipShow(true);
  };

  const mouseLeaveHandler = () => {
    setTooltipShow(false);
  };

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", mouseEnterHandler);
    ref.current?.addEventListener("mouseleave", mouseLeaveHandler);
    return () => {
      ref.current?.removeEventListener("mouseenter", mouseEnterHandler);
      ref.current?.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  return (
    <li
      ref={ref}
      className="group flex flex-nowrap basis-[44%] cursor-pointer underline underline-offset-4 decoration-primaryAccent hover:text-primaryAccent transition-colors"
    >
      <svg className="w-[24px] h-[24px] shrink-0">
        <use xlinkHref={`./images/sprite.svg#dot-line`}></use>
      </svg>
      {props.title}
      <div
        className={`fixed top-1/2 left-1/2 bg-[rgba(0,0,0,0.3) w-[40ch] max-h-fit bg-secondaryAccent rounded-3xl border border-primaryAccent p-4
                  transition-all duration-200 ease-linear ${
                    tooltipShow ? "opacity-100 visible" : "invisible opacity-0"
                  }`}
      >
        <h4>{props.title}</h4>
        <p>{props.content}</p>
      </div>
    </li>
  );
};

export default ServiceTooltipElement;
