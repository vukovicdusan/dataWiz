"use client";
import React, { useEffect, useState } from "react";

type TTopNavigation = {
  links: {
    link: string;
    name: string;
  }[];
};
const TopNavigation = (props: TTopNavigation) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    open && document.body.clientWidth < 1025
      ? (document.body.style.position = "fixed")
      : (document.body.style.position = "revert");

    return () => {
      document.body.style.position = "revert";
    };
  }, [open]);

  function navHandler(
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) {
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <>
      <nav
        id="mobile-navigation"
        className={`fixed lg:relative top-0 bottom-0 right-0 pl-10 pr-4 py-6 border-l border-l-primaryAccent lg:border-0 h-full w-max flex items-end z-30 backdrop-blur-lg bg-[rgba(46,104,208,.2)] lg:bg-transparent lg:backdrop-blur-0 lg:block transition-all duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-80 lg:translate-x-0"
        }`}
      >
        <ul className="flex gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row">
          {props.links.map((link, index) => (
            <li key={index} className="text-right">
              <a
                onClick={navHandler}
                className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
                href={link.link}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={navHandler}
        className="lg:hidden flex flex-col gap-[6px] absolute top-2 right-0 w-max h-max z-30"
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        <span
          className={`block h-[1px] w-6 bg-white transition-transform duration-200 ease-in-out ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block h-[1px] w-4 self-end bg-white transition-transform duration-200 ease-in-out ${
            open ? "translate-y-[3px] -translate-x-[1px] rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block h-[1px] w-6 self-end bg-white transition-transform duration-200 ease-in-out ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        ></span>
      </button>
    </>
  );
};

export default TopNavigation;
