import Wrapper from "@/components/Wrapper";
import { Metadata } from "next";
import React from "react";

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
        <h1 className="text-5xl mb-5 font-bold uppercase text-center">
          Tracking Success Stories
        </h1>
      </section>
    </Wrapper>
  );
};

export default TrackingSuccessStories;
