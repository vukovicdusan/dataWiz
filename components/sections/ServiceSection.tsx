import React from "react";
import Wrapper from "../Wrapper";
import ServiceBox from "../ServiceBox";
import BackgroundLight from "../BackgroundLight";
import AnimationContainer from "../AnimationContainer";

const ServiceSection = () => {
  return (
    <section id="services" className="relative mb-20 overflow-x-hidden">
      <BackgroundLight></BackgroundLight>
      <Wrapper>
        <AnimationContainer direction={"fromBottom"}>
          <h2 className="text-5xl text-white text-center mb-10 font-bold uppercase">
            Let Me Help You With:
          </h2>
        </AnimationContainer>
        <AnimationContainer direction={"fromBottom"}>
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,_minmax(min(400px,_100%),_1fr))]">
            {/* <div className="flex flex-wrap gap-3"> */}
            <ServiceBox
              service={"Website Tracking"}
              subservices={[
                [
                  "Event Tracking",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Ecommerce Tracking",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "User Tracking",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Marketing Attribution",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Funnel Tracking",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
              ]}
              icon={"website-tracking"}
            ></ServiceBox>
            <ServiceBox
              service={"Tracking Enhancements"}
              subservices={[
                [
                  "Server-Side Tracking",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "App Tracking",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Consent Mode",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Offline Conversion Tracking",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
              ]}
              icon={"tracking-strategy"}
            ></ServiceBox>
            <ServiceBox
              service={"Marketing Conversion Tracking"}
              subservices={[
                [
                  "Google Ads",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Meta Ads",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Microsoft Ads",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "TikTok Ads",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Linkedin Ads",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Other",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
              ]}
              icon={"conversion-tracking"}
            ></ServiceBox>
            <ServiceBox
              service={"Tracking Audit & Planning"}
              subservices={[
                [
                  "GA4 Audit",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "GTM Audit",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Ad Platform Audits",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Tracking Plan",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "UTM Tagging Strategy",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Data Layer Documentation",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
              ]}
              icon={"tracking-audit"}
            ></ServiceBox>

            <ServiceBox
              service={"Reporting & Visualization"}
              subservices={[
                [
                  "GA4",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Looker Studio",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Reporting Automation",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
              ]}
              icon={"reporting-visualization"}
            ></ServiceBox>
            <ServiceBox
              service={"Analysis"}
              subservices={[
                [
                  "Marketing",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Website",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Product",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "User",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Funnel",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
              ]}
              icon={"analysis"}
            ></ServiceBox>

            <ServiceBox
              service={"Consultation & Education"}
              subservices={[
                [
                  "Strategy & Planning",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Tracking Consultation",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Analytics Consultation",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Reporting Consultation",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
                [
                  "Education",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                ],
              ]}
              icon={"consultation"}
            ></ServiceBox>
          </div>
        </AnimationContainer>
      </Wrapper>
    </section>
  );
};

export default ServiceSection;
