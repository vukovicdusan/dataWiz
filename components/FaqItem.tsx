"use client";
import React, { useState } from "react";

type TFaqItemProps = {
  title: string;
  body: string;
};

const FaqItem = (props: TFaqItemProps) => {
  const [open, setOpen] = useState<boolean>(false);
  //   const accordionRef = React.useRef();

  function accordionHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <div className="max-w-prose p-4 mb-4 mx-auto border border-white rounded-2xl bg-secondaryAccent">
      <h2 id="panel-title" className="relative font-bold w-full ">
        <button
          className="w-full text-left"
          aria-expanded={open}
          aria-controls="accordion-content"
          onClick={accordionHandler}
        >
          {props.title}
        </button>
      </h2>
      <div
        className={`${
          open ? "grid-rows-[1fr] pt-4" : ""
        } grid grid-rows-[0] transition-all duration-500 will-change-[grid-template-rows]`}
        role="region"
        aria-labelledby="panel-title"
        aria-hidden={!open}
        id="panel-content"
      >
        <div className="overflow-hidden">
          <p>{props.body}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
