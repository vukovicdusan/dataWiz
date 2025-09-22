import BackToTop from "@/components/BackToTop";
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget";
import CtaSection from "@/components/sections/CtaSection";
import Shapedivider from "@/components/Shapedivider";
import ShapedividerDark from "@/components/ShapedividerDark";
import Wrapper from "@/components/Wrapper";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import awesomeBooks from "../../public/images/testimonials/awesomeBooks.jpg";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DataWiz - Tracking Success Stories ",
  description:
    "Welcome to DataWiz, where data meets insight and transforms your digital world.",
  verification: {
    other: { "facebook-domain-verification": "xr5b757smcignim4zuexkq0b2guxko" },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

const TrackingSuccessStories = () => {
  return (
    <Wrapper>
      {" "}
      <section className="py-10 mt-10">
        <h1 className="text-5xl mb-10 font-bold uppercase text-center">
          Tracking Success Stories
        </h1>
        <div className="switcher">
          <Link
            href="/tracking-success-stories/awesome-books"
            className="flex items-start gap-5 rounded-3xl bg-secondaryAccent p-6 h-full max-w-prose hover:-translate-y-5 transition-all duration-300"
          >
            <Image
              src={awesomeBooks}
              width={60}
              height={60}
              alt="awesome books logo"
              className="object-contain flex-shrink-0 rounded-full"
            ></Image>
            <div>
              <h4 className="font-bold text-xl">Awesome Books</h4>
              <p>
                AwesomeBooks, a global online bookstore, partnered with us to
                fix critical tracking gaps. By achieving accurate data, complete
                attribution, and full platform coverage, they unlocked reliable
                insights that boosted campaign performance and optimized ad
                spend.
              </p>
            </div>
          </Link>
        </div>
      </section>
      <Shapedivider
        classProp={"translate-y-[5px] w-screen ml-[50%] -translate-x-1/2"}
      ></Shapedivider>
      <div className="bg-secondaryAccent translate-y-1 w-screen ml-[50%] -translate-x-1/2 ">
        <CtaSection></CtaSection>
        <ShapedividerDark
          classProp={"translate-y-1 w-screen ml-[50%] -translate-x-1/2"}
        ></ShapedividerDark>
      </div>
      <BackToTop></BackToTop>
      <CalendlyBadgeWidget></CalendlyBadgeWidget>
    </Wrapper>
  );
};

export default TrackingSuccessStories;
