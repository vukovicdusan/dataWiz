"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Infographic.module.css";

const Infographic = () => {
	let animationRef = useRef<HTMLOListElement>(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		let config = {
			threshold: 0.5,
		};
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setShow(true);
				}
			});
		}, config);

		if (animationRef.current) {
			observer.observe(animationRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);
	// let show = true;
	let processes: string[] = [
		" Introductory Call",
		"Tracking Audit",
		"Data Plan",
		"Plan Execution",
		"Wrap-up Meeting",
	];
	return (
		<ol ref={animationRef} className={styles.infographic}>
			<div
				className={
					`${show ? styles.enterUpShow : styles.enterUpHidden}` +
					" " +
					styles.rocket
				}
			>
				<svg>
					<use xlinkHref={"./images/sprite.svg#rocket"}></use>
				</svg>
			</div>
			{processes.map((process, index) => (
				<li
					className={`${
						show ? styles.fadeInShow : styles.fadeInHidden
					}`}
					key={index}
				>
					{process}
				</li>
			))}
		</ol>
	);
};

export default Infographic;
