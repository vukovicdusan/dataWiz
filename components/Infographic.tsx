import React from "react";

const Infographic = () => {
  return (
    <ol className="pb-40 list-none grid gap-x-[var(--column-gap)] gap-y-[var(--row-gap)] [counter-reset:liCount] text-primaryAccent overflow-hidden w-[min(45rem,100%)] mx-auto mb-[-4rem] [--column-gap:2rem] [--rocket-width:6rem] grid-cols-[1fr_var(--rocket-width)_1fr]">
      <div>
        <svg className="icon">
          <use xlinkHref={"./img/subservices/sprite.svg#rocket"}></use>
        </svg>
      </div>
    </ol>
  );
};

export default Infographic;
