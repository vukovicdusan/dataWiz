import { ChildrenProps } from "@/types/ChildrenProps";
import React from "react";

type ButtonLinkPropsType = {
  link?: string;
};

const ButtonLink = (props: ChildrenProps & ButtonLinkPropsType) => {
  return (
    <a
      href={props.link}
      className="flex gap-4 rounded-3xl bg-primaryAccent px-3 py-2 group w-fit"
    >
      {props.children}
      <svg className="w-[24px] h-[24px] group-hover:translate-x-1 transition-transform">
        <use xlinkHref={`./images/sprite.svg#button-arrow`}></use>
      </svg>
    </a>
  );
};

export default ButtonLink;
