import React from "react";

type TWidthHeightProps = {
  width?: string;
  height?: string;
};

const BackgroundLight = (props: TWidthHeightProps) => {
  // let width = "w-[" + props.width ? props.width : "50%" + "]";
  // let height = "w-[" + props.height ? props.height : "50%" + "]";
  return (
    <span
      className={`bg-[rgba(46,_104,_221,_0.40)] blur-3xl absolute -z-10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        props.width || "w-1/2"
      } ${props.height || "h-1/2"}`}
    ></span>
  );
};

export default BackgroundLight;
