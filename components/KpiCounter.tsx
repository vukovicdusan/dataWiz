"use client";
import React from "react";
import CountUp from "react-countup";

type kpiPropsType = {
  number: number;
  afterNumber: string;
  title: string;
};

const KpiCounter = (props: kpiPropsType) => {
  return (
    <div className="text-center bg-secondaryAccent rounded-3xl py-6 px-4">
      <p className="text-8xl font-bold text-primaryAccent mb-2">
        <CountUp
          enableScrollSpy={true}
          scrollSpyOnce={true}
          start={0}
          end={props.number}
        />
        {props.afterNumber}
      </p>
      <p className="font-bold">{props.title}</p>
    </div>
  );
};

export default KpiCounter;
