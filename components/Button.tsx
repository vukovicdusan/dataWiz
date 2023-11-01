import { ChildrenProps } from "@/types/ChildrenProps";
import React from "react";

const Button = (props: ChildrenProps) => {
	return (
		<button className="flex gap-4 rounded-3xl bg-primaryAccent px-3 py-2">
			{props.children}
			<svg className="w-[24px] h-[24px]">
				<use xlinkHref={`./images/sprite.svg#button-arrow`}></use>
			</svg>
		</button>
	);
};

export default Button;
