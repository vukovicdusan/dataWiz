"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Infographic2.module.css";
import Image from "next/image";
import hat from "../public/images/logo-hat-star.png";

type ProcessType = {
  name: string;
  duration: string;
};

const Infographic2 = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  let processes: ProcessType[] = [
    { name: "Introductory Call", duration: "~ 2 days" },
    { name: "Audit", duration: "~ 2 days" },
    { name: "Planning", duration: "~ 1 day" },
    { name: "Plan Execution ", duration: "~ 1-2 weeks" },
    { name: "Testing", duration: "~ 1 week" },
    { name: "Review Call", duration: "~ 2 days" },
  ];

  useEffect(() => {
    let config = {
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      });
    }, config);

    if (bubbleContainerRef.current) {
      observer.observe(bubbleContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getStyle = (index: number, element: string) => {
    let bubbleCount = processes.length;
    const degStep = 180 / (bubbleCount - 1);
    const deg = index * degStep;
    const invertDeg = deg * -1;

    let containerStyle = {
      transform: `rotate(${deg}deg)`,
      opacity: "1",
    };

    let bubbleStyle = {
      transform: `rotate(${invertDeg}deg)`,
    };

    if (element === "container") {
      return containerStyle;
    } else {
      return bubbleStyle;
    }
  };

  return (
    <div className={`${styles.mainContainer} ${styles.centralized}`}>
      <div className={styles.mainCircle}>
        <div className={`${styles.inner} ${styles.centralized}`}>
          <Image alt="logo" src={hat}></Image>
        </div>
      </div>
      {processes.map((process, index) => (
        <div
          key={index}
          ref={bubbleContainerRef}
          className={`${styles.bubbleContainer}  ${styles.centralized} ${styles.blueDark}`}
          style={show ? getStyle(index, "container") : {}}
        >
          <div
            className={`${styles.pointer}  ${styles.centralized}  ${styles.blueDark}`}
          >
            <div className={styles.arrow}></div>
            <div className={styles.inner}></div>
          </div>
          <div
            style={show ? getStyle(index, "bubble") : {}}
            className={`relative z-0 ${styles.bubble}  ${styles.centralized}`}
          >
            <svg
              className={`absolute z-10 fill-white w-[calc(100%+10px)] h-[calc(100%+10px)] ${styles.duration}`}
              viewBox="0 0 100 100"
              width="100"
              height="100"
            >
              <defs>
                <path
                  id="circle"
                  d=" M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                ></path>
              </defs>
              <text fontSize="13">
                <textPath xlinkHref="#circle">{process.duration}</textPath>
              </text>
            </svg>
            <div className={`${styles.inner}  ${styles.centralized}`}>
              {process.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Infographic2;
