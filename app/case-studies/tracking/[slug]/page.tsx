import BackToTop from "@/components/BackToTop";
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget";
import Wrapper from "@/components/Wrapper";
import {
  getTrackingCaseStudiesArchive,
  getTrackingCaseStudyBySlug,
} from "@/lib/caseStudiesTracking";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type TrackingCaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const archive = await getTrackingCaseStudiesArchive();

  return archive.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  { params }: TrackingCaseStudyPageProps,
): Promise<Metadata> {
  const caseStudy = await getTrackingCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    return {
      title: "DataWiz - Tracking Success Stories",
    };
  }

  return {
    title: `DataWiz - Success Stories - ${caseStudy.name}`,
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
}

const TrackingCaseStudyPage = async ({ params }: TrackingCaseStudyPageProps) => {
  const caseStudy = await getTrackingCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const pdfUrl = caseStudy.case_study
    ? `/case-studies/tracking/${caseStudy.slug}/case-study`
    : null;

  return (
    <Wrapper>
      <section className="py-10 mt-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primaryAccent">
              Tracking Success Story
            </p>
            <h1 className="text-5xl font-bold uppercase">{caseStudy.name}</h1>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-secondaryAccent px-5 py-4">
            <Image
              src={caseStudy.logo}
              width={72}
              height={72}
              alt={`${caseStudy.name} logo`}
              className="rounded-full object-contain"
            />
            <Link
              href="/case-studies"
              className="text-sm font-bold uppercase tracking-[0.15em] text-primaryAccent"
            >
              Back to case studies
            </Link>
          </div>
        </div>

        {pdfUrl ? (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-secondaryAccent">
            <iframe
              src={pdfUrl}
              title={`${caseStudy.name} case study PDF`}
              className="h-[80vh] w-full bg-white"
            />
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/20 bg-secondaryAccent p-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">PDF coming soon</h2>
            <p className="mx-auto max-w-2xl text-lg">
              Add a PDF filename to this item in{" "}
              <code>content/case-studies/tracking/archive.md</code> and place
              the file in <code>content/case-studies/tracking</code>.
            </p>
          </div>
        )}

        {pdfUrl ? (
          <div className="mt-5 flex justify-end">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-primaryAccent hover:text-primaryAccent"
            >
              Open PDF in new tab
            </a>
          </div>
        ) : null}
      </section>

      <BackToTop />
      <CalendlyBadgeWidget />
    </Wrapper>
  );
};

export default TrackingCaseStudyPage;
