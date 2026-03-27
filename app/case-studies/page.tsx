import Wrapper from "@/components/Wrapper";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DataWiz - Case Studies",
  description:
    "Browse DataWiz case study categories and explore client success stories by service area.",
  verification: {
    other: { "facebook-domain-verification": "xr5b757smcignim4zuexkq0b2guxko" },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const CaseStudiesPage = () => {
  return (
    <Wrapper>
      <section className="mt-10 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primaryAccent">
            Case Studies
          </p>
          <h1 className="mb-6 text-5xl font-bold uppercase">
            Explore success stories by category
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
            Tracking is the first category available now, with more case study
            types ready to be added here as the library grows.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Link
            href="/case-studies/tracking"
            className="block rounded-3xl border border-white/10 bg-secondaryAccent p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primaryAccent"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primaryAccent">
              Available now
            </p>
            <h2 className="mb-3 text-3xl font-bold uppercase">
              Tracking case studies
            </h2>
            <p className="text-white/80">
              Browse implementation and performance stories focused on
              tracking, measurement, and analytics foundations.
            </p>
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

export default CaseStudiesPage;
