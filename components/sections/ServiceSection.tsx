import React from "react";
import Wrapper from "../Wrapper";
import ServiceBox from "../ServiceBox";
import BackgroundLight from "../BackgroundLight";
import AnimationContainer from "../AnimationContainer";

const ServiceSection = () => {
  return (
    <section id="services" className="relative mb-20">
      <BackgroundLight></BackgroundLight>
      <Wrapper>
        <AnimationContainer direction={"fromBottom"}>
          <h2 className="text-5xl text-primaryAccent text-center mb-10 font-bold uppercase">
            Services
          </h2>
        </AnimationContainer>
        <div className="grid gap-3 grid-cols-[repeat(auto-fit,_minmax(min(400px,_100%),_1fr))]">
          {/* <AnimationContainer direction={"fromLeft"} delay={""}> */}
          <ServiceBox
            service={"Website Tracking"}
            subservices={[
              [
                "Event Tracking",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "Ecommerce/Product",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "Tracking",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "Marketing Attribution",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "User Tracking",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "Funnel Tracking",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
            ]}
            icon={"website-tracking"}
          ></ServiceBox>
          {/* </AnimationContainer> */}
          {/* <AnimationContainer direction={"fromRight"} delay={"delay-100"}> */}
          <ServiceBox
            service={"Tracking Strategy & Documentation"}
            subservices={[
              [
                "Data Plan",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "UTM Tagging Strategy",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
            ]}
            icon={"tracking-strategy"}
          ></ServiceBox>
          {/* </AnimationContainer> */}
          {/* <AnimationContainer direction={"fromLeft"} delay={"delay-200"}> */}
          <ServiceBox
            service={"Tracking Audit"}
            subservices={[
              [
                "GA4",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "GTM",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
              [
                "Marketing Platforms",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
              ],
            ]}
            icon={"tracking-audit"}
          ></ServiceBox>
          {/* </AnimationContainer> */}
          {/* <AnimationContainer direction={"fromRight"} delay={"delay-300"}> */}
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
          {/* </AnimationContainer> */}
          {/* <AnimationContainer direction={"fromLeft"} delay={"delay-500"}> */}
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
            ]}
            icon={"reporting-visualization"}
          ></ServiceBox>
          {/* </AnimationContainer> */}
          {/* <AnimationContainer direction={"fromRight"} delay={"delay-500"}> */}
          <ServiceBox
            service={"Server-Side Tracking"}
            icon={"server-side-tracking"}
          ></ServiceBox>
          {/* </AnimationContainer> */}
          {/* <AnimationContainer direction={"fromLeft"} delay={"delay-700"}> */}
          <ServiceBox
            service={"Conversion Tracking for Marketing Platforms"}
            icon={"conversion-tracking"}
          ></ServiceBox>
          {/* </AnimationContainer> */}
          {/* <AnimationContainer direction={"fromRight"} delay={"delay-700"}> */}
          <ServiceBox
            service={"Consultation"}
            icon={"consultation"}
          ></ServiceBox>
          {/* </AnimationContainer> */}
        </div>
      </Wrapper>
    </section>
  );
};

export default ServiceSection;
