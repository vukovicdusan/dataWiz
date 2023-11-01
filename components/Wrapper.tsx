import { ChildrenProps } from "@/types/ChildrenProps";
import React from "react";

const Wrapper = (props: ChildrenProps) => {
	return (
		<div className="w-wrapperWidth px-wrapperPadding mx-auto">
			{props.children}
		</div>
	);
};

export default Wrapper;
