"use client";
import React, { useEffect, useState } from "react";
type TTopNavigation = {
	links: {
		link: string;
		name: string;
	}[];
};
const TopNavigation = (props: TTopNavigation) => {
	const [open, setOpen] = useState<boolean>(false);
	const [scrollPosition, setScrollPosition] = useState<number>(
		window.scrollY
	);
	const [sticky, setSticky] = useState<boolean>(false);

	useEffect(() => {
		function scrollHandler() {
			let newScroll = window.scrollY;
			setSticky(scrollPosition > newScroll);
			setScrollPosition(newScroll);
		}

		window.addEventListener("scroll", () => {
			scrollHandler();
		});
	}, []);

	console.log(sticky);

	function navHandler(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		open ? setOpen(false) : setOpen(true);
	}

	return (
		<>
			<nav
				id="mobile-navigation"
				className={`fixed sm:relative top-0 right-0 pl-10 pr-4 py-2  h-full w-max flex items-end z-30 backdrop-blur-lg bg-[rgba(46,104,208,.2)] sm:bg-transparent sm:backdrop-blur-0 sm:block transition-all duration-500 ease-in-out ${
					open ? "translate-x-0" : "translate-x-80 sm:translate-x-0"
				}`}
			>
				<ul className="flex gap-3 flex-wrap sm:flex-nowrap flex-col sm:flex-row">
					{props.links.map((link, index) => (
						<li key={index} className="text-right">
							<a
								className="hover:text-primaryAccent uppercase transition-colors duration-200 ease-linear"
								href={link.link}
							>
								{link.name}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<button
				onClick={navHandler}
				className="sm:hidden flex flex-col gap-[6px] fixed top-5 right-5 w-max h-max z-30"
				aria-expanded={open}
				aria-controls="mobile-navigation"
			>
				<span
					className={`block h-[1px] w-6 bg-white transition-transform duration-200 ease-in-out ${
						open ? "translate-y-[7px] rotate-45" : ""
					}`}
				></span>
				<span
					className={`block h-[1px] w-6 bg-white transition-transform duration-200 ease-in-out ${
						open ? "rotate-45" : ""
					}`}
				></span>
				<span
					className={`block h-[1px] w-6 bg-white transition-transform duration-200 ease-in-out ${
						open ? "-translate-y-[7px] -rotate-45" : ""
					}`}
				></span>
			</button>
		</>
	);
};

export default TopNavigation;
