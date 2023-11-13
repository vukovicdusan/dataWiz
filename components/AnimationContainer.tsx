"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChildrenProps } from "@/types/ChildrenProps";

interface AnimationContainerProps extends ChildrenProps {
  direction: string;
  delay?: string;
}

const AnimationContainer: React.FC<AnimationContainerProps> = ({
  direction,
  children,
  delay,
}) => {
  let animationRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let config = {
      threshold: 0.4,
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

  function directionHandler(directionProp: string) {
    let direction;
    switch (directionProp) {
      case "fromRight":
        direction = "translate-x-[500px]";
        break;
      case "fromLeft":
        direction = "-translate-x-[500px]";
        break;
      case "fromTop":
        direction = "translate-y-[500px]";
        break;
      case "fromBottom":
        direction = "-translate-y-[500px]";
        break;
    }
    return direction;
  }

  return (
    <div className="overflow-hidden" ref={animationRef}>
      <div
        className={`transition-all duration-700 ease-in-out h-full ${
          show
            ? "opacity-100 translate-x-0"
            : "opacity-0 " + directionHandler(direction)
        } ${delay ? delay : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimationContainer;
