import React from "react";
import ServiceTooltipElement from "./ServiceTooltipElement";

type TServiceBoxProps = {
  icon: string;
  subservices?: [string, string][];
  service?: string;
};

const ServiceBox = (props: TServiceBoxProps) => {
  return (
    <>
      <article className="flex gap-5 rounded-3xl bg-secondaryAccent p-6 h-full min-[917px]:last:translate-x-1/2">
        <svg
          className="lg:w-[80px] lg:h-[80px] sm:w-[70px] sm:h-[70px] w-[40px]
        h-[40px] shrink-0"
        >
          <use xlinkHref={`./images/sprite.svg#${props.icon}`}></use>
        </svg>
        <div>
          <h4 className="font-bold text-xl">{props.service}</h4>
          <ul className="flex flex-wrap gap-2 mt-2">
            {props.subservices?.map((subservice, index) => (
              <ServiceTooltipElement
                key={index}
                title={subservice[0]}
                content={subservice[1]}
              ></ServiceTooltipElement>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
};

export default ServiceBox;
