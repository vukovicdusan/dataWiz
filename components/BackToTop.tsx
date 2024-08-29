"use client";
import React, { useEffect, useState } from "react";
import btt from "../public/images/BackToTop6.png";
import Image from "next/image";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      scroll > 500 ? setShow(true) : setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${
        show ? "translate-y-0" : "translate-y-96"
      } h-[70px] w-[70px] fixed bottom-6 right-6  border-[2px] border-[rgba(255,255,255,0.4)] rounded-full  opacity-40 z-20 transition-transform duration-300 ease-in-out group`}
      onClick={scrollToTop}
    >
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-max text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Back To Top
      </span>
      <Image
        className="w-full h-full"
        alt="btt"
        src={btt}
        // width={50}
        // height={50}
      ></Image>
    </button>
  );
};

export default BackToTop;
