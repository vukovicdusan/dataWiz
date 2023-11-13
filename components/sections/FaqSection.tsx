import React from "react";
import Wrapper from "../Wrapper";
import BackgroundLight from "../BackgroundLight";
import FaqItem from "../FaqItem";
import AnimationContainer from "../AnimationContainer";

const FaqSection = () => {
	const faqs = [
		{
			title: "What Kind Of Clients Have You Served So Far?",
			body: "Handling diverse budget constraints for a wide range of business types, we worked with small, middle, and big companies, spanning from e-commerce via lead generation to B2B and SaaS. Our smallest client had a monthly advertising budget of 5K and our largest went as high as 240K. We learned how to squeeze the maximum out of smaller budgets and decrease waste to a minimum with the big ones.",
		},
		{
			title: "What Kind Of Clients Have You Served So Far?",
			body: "Handling diverse budget constraints for a wide range of business types, we worked with small, middle, and big companies, spanning from e-commerce via lead generation to B2B and SaaS. Our smallest client had a monthly advertising budget of 5K and our largest went as high as 240K. We learned how to squeeze the maximum out of smaller budgets and decrease waste to a minimum with the big ones.",
		},
		{
			title: "What Kind Of Clients Have You Served So Far?",
			body: "Handling diverse budget constraints for a wide range of business types, we worked with small, middle, and big companies, spanning from e-commerce via lead generation to B2B and SaaS. Our smallest client had a monthly advertising budget of 5K and our largest went as high as 240K. We learned how to squeeze the maximum out of smaller budgets and decrease waste to a minimum with the big ones.",
		},
		{
			title: "What Kind Of Clients Have You Served So Far?",
			body: "Handling diverse budget constraints for a wide range of business types, we worked with small, middle, and big companies, spanning from e-commerce via lead generation to B2B and SaaS. Our smallest client had a monthly advertising budget of 5K and our largest went as high as 240K. We learned how to squeeze the maximum out of smaller budgets and decrease waste to a minimum with the big ones.",
		},
		{
			title: "What Kind Of Clients Have You Served So Far?",
			body: "Handling diverse budget constraints for a wide range of business types, we worked with small, middle, and big companies, spanning from e-commerce via lead generation to B2B and SaaS. Our smallest client had a monthly advertising budget of 5K and our largest went as high as 240K. We learned how to squeeze the maximum out of smaller budgets and decrease waste to a minimum with the big ones.",
		},
	];
	return (
		<Wrapper>
			<section id="faq" className="relative">
				<div className="mb-10">
					<AnimationContainer direction={"fromBottom"}>
						<h2 className="text-5xl font-bold text-center mb-4">
							FAQ
						</h2>
					</AnimationContainer>
					<AnimationContainer direction={"fromTop"}>
						<p className="text-lg text-center mb-4 sm:mb-8">
							These are some of our most commonly asked questions
						</p>
					</AnimationContainer>
				</div>
				{faqs.map((faq, index) => (
					<AnimationContainer
						key={index}
						direction={"fromBottom"}
						delay={"delay-" + index + "00"}
					>
						<FaqItem body={faq.body} title={faq.title}></FaqItem>
					</AnimationContainer>
				))}
				<BackgroundLight></BackgroundLight>
			</section>
		</Wrapper>
	);
};

export default FaqSection;
