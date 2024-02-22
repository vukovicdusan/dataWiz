"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Infographic2.module.css";
import Image from "next/image";
import hat from "../public/images/logo-hat.png";

const Infographic2 = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  let processes: string[] = [
    " Introductory Call",
    "Tracking Audit",
    "Data Plan",
    "Plan Execution",
    "Wrap-up Meeting",
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
            className={`${styles.bubble}  ${styles.centralized}`}
          >
            <div className={`${styles.inner}  ${styles.centralized}`}>
              {process}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Infographic2;
