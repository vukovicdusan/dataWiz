import BackToTop from "@/components/BackToTop";
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget";
import CtaSection from "@/components/sections/CtaSection";
import Shapedivider from "@/components/Shapedivider";
import ShapedividerDark from "@/components/ShapedividerDark";
import Wrapper from "@/components/Wrapper";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import KpiCounter from "@/components/KpiCounter";
import { getTrackingCaseStudiesArchive } from "@/lib/caseStudiesTracking";

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
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const TrackingSuccessStories = async () => {
  const archive = await getTrackingCaseStudiesArchive();

  return (
    <Wrapper>
      <section className="py-10 mt-10">
        <h1 className="text-5xl mb-10 font-bold uppercase text-center">
          {archive.title}
        </h1>

        <div className="switcher gap-4">
          {archive.items.map((item) => (
            <Link
              key={item.slug}
              href={`/case-studies/tracking/${item.slug}`}
              className="flex flex-col items-center gap-5 rounded-3xl bg-secondaryAccent border-solid border border-transparent p-4 sm:p-6 h-full max-w-[60ch] hover:-translate-y-5 hover:border-white transition-all duration-300"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={item.logo}
                  width={60}
                  height={60}
                  alt={`${item.name} logo`}
                  className="object-contain flex-shrink-0 rounded-full"
                />
                <h4 className="font-bold text-xl">{item.name}</h4>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-3 flex-wrap sm:flex-nowrap justify-center">
                  {item.kpis.map((kpi) => (
                    <KpiCounter
                      key={kpi.title}
                      size={"sm"}
                      number={kpi.number}
                      afterNumber={kpi.afterNumber}
                      title={kpi.title}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Shapedivider
        classProp={"translate-y-[5px] w-screen ml-[50%] -translate-x-1/2"}
      />
      <div className="bg-secondaryAccent translate-y-1 w-screen ml-[50%] -translate-x-1/2 ">
        <CtaSection />
        <ShapedividerDark
          classProp={"translate-y-1 w-screen ml-[50%] -translate-x-1/2"}
        />
      </div>

      <BackToTop />
      <CalendlyBadgeWidget />
    </Wrapper>
  );
};

export default TrackingSuccessStories;
