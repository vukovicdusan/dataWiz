import BackToTop from "@/components/BackToTop";
import AboutSection from "@/components/sections/AboutSection";
import CtaSection from "@/components/sections/CtaSection";
import FaqSection from "@/components/sections/FaqSection";
import Hero from "@/components/sections/Hero";
import IndustriesSection from "@/components/sections/IndustriesSection";
import InfoSection from "@/components/sections/InfoSection";
import KpiSection from "@/components/sections/KpiSection";
import MyProcessSection from "@/components/sections/MyProcessSection";
import ServiceSection from "@/components/sections/ServiceSection";
import Testimonials from "@/components/sections/Testimonials";
import Shapedivider from "@/components/Shapedivider";
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget";

const Consultation = () => {
  return (
  <>
          <Hero />
          <Shapedivider classProp={"translate-y-1"}></Shapedivider>
          {/* <InfoSection></InfoSection> */}
          <KpiSection></KpiSection>
          <Shapedivider
            classProp={"rotate-180 translate-y-[-5px]"}
            ></Shapedivider>
          <ServiceSection></ServiceSection>
          <IndustriesSection></IndustriesSection>
          <MyProcessSection></MyProcessSection>
          <Testimonials></Testimonials>
          <Shapedivider classProp={"translate-y-[5px]"}></Shapedivider>
          <CtaSection></CtaSection>
          <Shapedivider
            classProp={"rotate-180 translate-y-[-5px]"}
          ></Shapedivider>
          <FaqSection></FaqSection>
          <Shapedivider classProp={"translate-y-[5px]"}></Shapedivider>
          <AboutSection></AboutSection>
          <BackToTop></BackToTop>
          <CalendlyBadgeWidget></CalendlyBadgeWidget>
            </>
            )
}

export default Consultation;
