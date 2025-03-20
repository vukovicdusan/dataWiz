import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

const titilium = Titillium_Web({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataWiz",
  description:
    "Welcome to DataWiz, where data meets insight and transforms your digital world.",
  verification: {
    other: { "facebook-domain-verification": "xr5b757smcignim4zuexkq0b2guxko" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${titilium.className} bg-primaryBg`}>
        <Header />
        <main className="overflow-hidden">
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
        </main>
        <Footer />
      </body>
    </html>
  );
}
