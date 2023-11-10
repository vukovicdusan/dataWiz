import React from "react";
import Wrapper from "../Wrapper";
import ServiceBox from "../ServiceBox";
import BackgroundLight from "../BackgroundLight";

const ServiceSection = () => {
	return (
		<section className="relative mb-20">
			<BackgroundLight></BackgroundLight>
			<Wrapper>
				<h2 className="text-5xl text-primaryAccent text-center mb-10 font-bold">
					Services
				</h2>
				<div className="grid gap-3 grid-cols-[repeat(auto-fit,_minmax(min(400px,_100%),_1fr))]">
					<ServiceBox
						service={"Website Tracking"}
						subservices={[
							"Event Tracking",
							"Ecommerce/Product",
							"Tracking",
							"Marketing Attribution",
							"User Tracking",
							"Funnel Tracking",
						]}
						icon={"website-tracking"}
					></ServiceBox>
					<ServiceBox
						service={"Tracking Strategy & Documentation"}
						subservices={["Data Plan", "UTM Tagging Strategy"]}
						icon={"tracking-strategy"}
					></ServiceBox>
					<ServiceBox
						service={"Tracking Audit"}
						subservices={["GA4", "GTM", "Marketing Platforms"]}
						icon={"tracking-audit"}
					></ServiceBox>
					<ServiceBox
						service={"Analysis"}
						subservices={[
							"Marketing",
							"Website",
							"Product",
							"User",
							"Funnel",
						]}
						icon={"analysis"}
					></ServiceBox>
					<ServiceBox
						service={"Reporting & Visualization"}
						subservices={["GA4", "Looker Studio"]}
						icon={"reporting-visualization"}
					></ServiceBox>
					<ServiceBox
						service={"Server-Side Tracking"}
						icon={"server-side-tracking"}
					></ServiceBox>
					<ServiceBox
						service={"Conversion Tracking for Marketing Platforms"}
						icon={"conversion-tracking"}
					></ServiceBox>
					<ServiceBox
						service={"Consultation"}
						icon={"consultation"}
					></ServiceBox>
				</div>
			</Wrapper>
		</section>
	);
};

export default ServiceSection;
