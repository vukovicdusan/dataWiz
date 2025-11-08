"use client";
import React from "react";
import CountUp from "react-countup";

type kpiPropsType = {
  number: number;
  beforeNumber?: string;
  afterNumber?: string;
  title: string;
  size?: string;
};

const KpiCounter = (props: kpiPropsType) => {
  let kpiLg = (
    <div className="text-center border border-white rounded-3xl py-4 md:py-6 px-4">
      <p className="text-6xl md:text-8xl font-bold text-primaryAccent mb-2">
        {props.beforeNumber}
        <CountUp enableScrollSpy={true} scrollSpyOnce={true} start={0} end={props.number} duration={2} />
        {props.afterNumber}
      </p>
      <p className="font-bold">{props.title}</p>
    </div>
  );
  let kpiSm = (
    <div className="text-center border border-white rounded-2xl py-1 md:py-2 px-3">
      <p className="text-1xl md:text-2xl font-bold text-primaryAccent mb-2">
        {props.beforeNumber}
        <CountUp enableScrollSpy={true} scrollSpyOnce={true} start={0} end={props.number} duration={2} />
        {props.afterNumber}
      </p>
      <p className="font-bold">{props.title}</p>
    </div>
  );
  let kpi = props.size === "lg" ? kpiLg : kpiSm;
  return kpi;
};

export default KpiCounter;
