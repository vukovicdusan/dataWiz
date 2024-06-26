"use client";
import React from "react";
import CountUp from "react-countup";

type kpiPropsType = {
  number: number;
  beforeNumber?: string;
  afterNumber?: string;
  title: string;
};

const KpiCounter = (props: kpiPropsType) => {
  return (
    <div className="text-center border border-white rounded-3xl py-4 md:py-6 px-4">
      <p className="text-6xl md:text-8xl font-bold text-primaryAccent mb-2">
        {props.beforeNumber}
        <CountUp
          enableScrollSpy={true}
          scrollSpyOnce={true}
          start={0}
          end={props.number}
          duration={2}
        />
        {props.afterNumber}
      </p>
      <p className="font-bold">{props.title}</p>
    </div>
  );
};

export default KpiCounter;
