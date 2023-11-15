import Image from "next/image";
import React from "react";
import rocket from "../public/images/back-to-top.png";

const Spinner = () => {
	return (
		<div className="animate-spin p-2 border-[2px] border-[rgba(255,255,255,0.4)] rounded-full bg-primaryAccent opacity-20 w-max">
			<Image
				className="invert"
				alt="rocket"
				src={rocket}
				width={30}
				height={30}
			></Image>
		</div>
	);
};

export default Spinner;
