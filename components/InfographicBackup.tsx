import React from "react";

const InfographicBackup = () => {
  let show = true;
  let processes: string[] = [
    " Introductory Call",
    "Tracking Audit",
    "Data Plan",
    "Plan Execution",
    "Wrap-up Meeting",
  ];
  return (
    <ol className="pb-40 list-none grid gap-x-[var(--column-gap)] gap-y-[var(--row-gap)] [counter-reset:liCount] text-primaryAccent overflow-hidden w-[min(45rem,100%)] mx-auto mb-[-4rem] [--column-gap:2rem] [--rocket-width:6rem] grid-cols-[1fr_var(--rocket-width)_1fr]">
      <div
        className={
          `${
            show
              ? "translate-y-[500px] opacity-20 blur-sm"
              : "translate-y-[500px] opacity-100 blur-0 transition-all duration-1000 ease-out"
          }` + "col-span-1 row-span-1 relative isolate"
        }
      >
        <svg className="w-[var(--rocket-width)] h-[var(--rocket-height)] translate-y-[30px]">
          <use xlinkHref={"./img/subservices/sprite.svg#rocket"}></use>
        </svg>
        <span className="absolute w-1/2 h-[200vh] top-[calc(100%-var(--rocket-height)*0.21)] left-1/4 -z-10 bg-rocket bg-no-repeat bg-center [background-size:_100%_calc(var(--rocket-height)*0.4),100%,100%_calc(var(--rocket-height)*0.4)]"></span>
      </div>
      {processes.map((process, index) => (
        <li
          key={index}
          className={
            `${show ? "opacity-100 blur-0" : "opacity-0 blur-sm"}` +
            "col-span-[1/-1] w-[calc(50%-var(--rocket-width)_/2_-_var(--column-gap))] odd:justify-self-end even:text-right [counter-increment: liCount] col-span-[-2] relative transition-all duration-1000 ease-linea [&:nth-child(2)]:delay-[1500ms] [&:nth-child(3)]:delay-[1300ms] [&:nth-child(4)]:delay-[1100ms] [&:nth-child(5)]:delay-[900ms]"
          }
        >
          <span className="even:right-[unset] even:left-[calc(100%+var(--column-gap)/2)]"></span>
          {process}
          <span
            className="even:left-[unset] even:right-[calc(var(--circle-pos-x)*-1)] even:[--dot_pos_multiplier:-1] before:content-[counter(liCount,decimal-leading-zero)] before:w-[var(--number-circle-size)] before:aspect-square grid before:place-items-center before:rounded-[50%] before:absolute before:[--circle-pos-x:calc(var(--number-circle-size)/2+var(--column-gap)+var(--rocket-width)/2)] before:left-[calc(var(--circle-pos-x)*-1)] before:top-[calc(50%-var(--number-circle-size)/2)] before:bg-primaryAccent before:text-white before:font-medium before:[--dot-size:calc(
      var(--number-circle-size)/-2+var(--number-line-dot-size))] before:shadow-[inset_0_0_0_var(--number-circle-border-size)_currentcolor,inset_-0.125rem_0.125rem_0.25rem_var(--number-circle-border-size)_rgb(0_0_0_/_0.25),-0.125rem_0.125rem_0.25rem_rgb(0_0_0_/_0.5),calc(var(--number-line-length)*var(--dot_pos_multiplier,1))_0_0_var(--dot-size)_currentcolor] [&:nth-child(3)]before:bg-[#7251a2]"
          ></span>
        </li>
      ))}
      <span className="row-span-1 col-[1/-1]"></span>
    </ol>
  );
};

export default InfographicBackup;
