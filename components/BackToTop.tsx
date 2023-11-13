"use client";
import React, { useEffect, useState } from "react";
import rocket from "../public/images/back-to-top.png";
import Image from "next/image";

const BackToTop = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			let scroll = window.scrollY;
			scroll > 500 ? setShow(true) : setShow(false);
		});
		return () => {
			window.removeEventListener("scroll", () => {});
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			className={`${
				show ? "translate-y-0" : "translate-y-96"
			} fixed bottom-6 right-6 p-2 border-[2px] border-[rgba(255,255,255,0.4)] rounded-full bg-primaryAccent opacity-20 z-20 transition-transform duration-300 ease-in-out`}
			onClick={scrollToTop}
		>
			<Image
				className="invert"
				alt="rocket"
				src={rocket}
				width={50}
				height={50}
			></Image>
		</button>
	);
};

export default BackToTop;
