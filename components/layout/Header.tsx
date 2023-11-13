import React from "react";
import logo from "../../public/images/logo-generic.svg";
import Image from "next/image";
import Wrapper from "../Wrapper";
import TopNavigation from "../TopNavigation";

const Header = () => {
	const linksArr = [
		{ link: "#services", name: "Services" },
		{ link: "#process", name: "My Process" },
		{ link: "#audit", name: "Audit" },
		{ link: "#faq", name: "FAQ" },
		{ link: "#about", name: "About Me" },
	];

	return (
		<header className="relative top-0 left-0 right-0 mx-auto py-4 z-30">
			<Wrapper>
				<div className="flex justify-between items-center relative">
					<Image src={logo} alt="logo" width={150}></Image>
					<TopNavigation links={linksArr}></TopNavigation>
				</div>
			</Wrapper>
		</header>
	);
};

export default Header;
