"use client";
import React, { useEffect, useRef, useState } from "react";

type TServiceTooltipElement = {
	title: string;
	content: string;
};

const ServiceTooltipElement = (props: TServiceTooltipElement) => {
	const [tooltipShow, setTooltipShow] = useState(false);
	const [tooltipYPosition, setTooltipYPosition] = useState("");
	const [tooltipXPosition, setTooltipXPosition] = useState("");
	const ref = useRef<HTMLLIElement>(null);

	const mouseEnterHandler = () => {
		setTooltipShow(true);
		if (ref.current) {
			let element = ref.current.getBoundingClientRect();
			let distanceToLeft = element.left;
			let distanceToRight = window.innerWidth - element.right;
			let distanceToTop = element.top;
			let distanceToBottom = window.innerHeight - element.bottom;
			distanceToLeft > distanceToRight
				? setTooltipYPosition("right-0 md:right-full")
				: setTooltipYPosition("-left-12 sm:left-0 md:left-1/2");
			distanceToTop > distanceToBottom
				? setTooltipXPosition("top-0")
				: setTooltipXPosition("top-full");
		}
	};

	const mouseLeaveHandler = () => {
		setTooltipShow(false);
	};

	useEffect(() => {
		ref.current?.addEventListener("mouseenter", mouseEnterHandler);
		ref.current?.addEventListener("mouseleave", mouseLeaveHandler);
		return () => {
			ref.current?.removeEventListener("mouseenter", mouseEnterHandler);
			ref.current?.removeEventListener("mouseleave", mouseLeaveHandler);
		};
	}, []);

	return (
		<li
			ref={ref}
			className="relative flex flex-nowrap basis-[44%] cursor-pointer underline underline-offset-4 decoration-primaryAccent hover:text-primaryAccent transition-colors"
		>
			<svg className="w-[24px] h-[24px] shrink-0">
				<use xlinkHref={`./images/sprite.svg#dot-line`}></use>
			</svg>
			<button className="contents">{props.title}</button>
			<div
				className={`absolute bg-[rgba(0,0,0,0.3) max-[330px]:w-[25ch]  w-[30ch] sm:w-[40ch] max-h-fit bg-secondaryAccent rounded-3xl border border-primaryAccent p-4
                  transition-all duration-200 ease-linear z-10 ${
						tooltipShow
							? "opacity-100 visible"
							: "invisible opacity-0"
					} ${tooltipYPosition} ${tooltipXPosition}`}
			>
				<h4 className="font-bold">{props.title}</h4>
				<p className="text-white">{props.content}</p>
			</div>
		</li>
	);
};

export default ServiceTooltipElement;
