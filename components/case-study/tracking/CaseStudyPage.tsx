import AnimationContainer from "@/components/AnimationContainer";
import BackToTop from "@/components/BackToTop";
import BackgroundLight from "@/components/BackgroundLight";
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget";
import DoughnutAB from "@/components/charts/DoughnutAB";
import KpiCounter from "@/components/KpiCounter";
import CtaSection from "@/components/sections/CtaSection";
import Shapedivider from "@/components/Shapedivider";
import ShapedividerDark from "@/components/ShapedividerDark";
import AwesomeBooksTable1 from "@/components/tables/AwesomeBooksTable1";
import AwesomeBooksTable2 from "@/components/tables/AwesomeBooksTable2";
import Wrapper from "@/components/Wrapper";
import type {
  CaseStudy,
  CaseStudyContentItem,
  CaseStudyResultSection,
} from "@/lib/caseStudies";
import Image from "next/image";

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
};

type DetailSectionProps = {
  title: string;
  items?: CaseStudyContentItem[];
  tone: "red" | "green";
  icon: "warning" | "rocket" | "tracking" | "audit";
};

const toneClasses = {
  red: {
    glow: "after:bg-[rgba(232,9,9,0.4)]",
    line: "bg-[linear-gradient(0deg,rgba(0,0,0,0)0%,rgb(224,114,114)25%,rgb(219,15,15)50%,rgb(224,114,114)85%,rgba(0,0,0,0)100%)]",
  },
  green: {
    glow: "after:bg-[rgba(2,252,23,0.4)]",
    line: "bg-[linear-gradient(0deg,rgba(0,0,0,0)0%,rgb(120,245,133)25%,rgb(9,148,23)50%,rgb(120,245,133)85%,rgba(0,0,0,0)100%)]",
  },
};

const spriteIcons: Record<"tracking" | "audit", string> = {
  tracking: "/images/sprite.svg#website-tracking",
  audit: "/images/sprite.svg#tracking-audit",
};

function Icon({ icon }: Pick<DetailSectionProps, "icon">) {
  if (icon === "warning") {
    return (
      <svg
        width={40}
        height={40}
        fill="#fff"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 123.996 123.996"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <path d="M9.821,118.048h104.4c7.3,0,12-7.7,8.7-14.2l-52.2-92.5c-3.601-7.199-13.9-7.199-17.5,0l-52.2,92.5 C-2.179,110.348,2.521,118.048,9.821,118.048z M70.222,96.548c0,4.8-3.5,8.5-8.5,8.5s-8.5-3.7-8.5-8.5v-0.2c0-4.8,3.5-8.5,8.5-8.5 s8.5,3.7,8.5,8.5V96.548z M57.121,34.048h9.801c2.699,0,4.3,2.3,4,5.2l-4.301,37.6c-0.3,2.7-2.1,4.4-4.6,4.4s-4.3-1.7-4.6-4.4 l-4.301-37.6C52.821,36.348,54.422,34.048,57.121,34.048z"></path>{" "}
          </g>{" "}
        </g>
      </svg>
    );
  }

  if (icon === "rocket") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5023 14.3674L20.5319 9.35289C21.2563 8.63072 21.6185 8.26963 21.8092 7.81046C22 7.3513 22 6.84065 22 5.81937V5.33146C22 3.76099 22 2.97576 21.5106 2.48788C21.0213 2 20.2337 2 18.6585 2H18.1691C17.1447 2 16.6325 2 16.172 2.19019C15.7114 2.38039 15.3493 2.74147 14.6249 3.46364L9.59522 8.47817C8.74882 9.32202 8.224 9.84526 8.02078 10.3506C7.95657 10.5103 7.92446 10.6682 7.92446 10.8339C7.92446 11.5238 8.48138 12.0791 9.59522 13.1896L9.74492 13.3388L11.4985 11.5591C11.7486 11.3053 12.1571 11.3022 12.4109 11.5523C12.6647 11.8024 12.6678 12.2109 12.4177 12.4647L10.6587 14.2499L10.7766 14.3674C11.8905 15.4779 12.4474 16.0331 13.1394 16.0331C13.2924 16.0331 13.4387 16.006 13.5858 15.9518C14.1048 15.7607 14.6345 15.2325 15.5023 14.3674ZM17.8652 8.47854C17.2127 9.12904 16.1548 9.12904 15.5024 8.47854C14.8499 7.82803 14.8499 6.77335 15.5024 6.12284C16.1548 5.47233 17.2127 5.47233 17.8652 6.12284C18.5177 6.77335 18.5177 7.82803 17.8652 8.47854Z"
            fill="#fff"
          ></path>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.77409 12.4814C3.07033 12.778 3.07004 13.2586 2.77343 13.5548L2.61779 13.7103C2.48483 13.8431 2.48483 14.058 2.61779 14.1908C2.75125 14.3241 2.96801 14.3241 3.10147 14.1908L4.8136 12.4807C5.1102 12.1845 5.59079 12.1848 5.88704 12.4814C6.18328 12.778 6.18298 13.2586 5.88638 13.5548L4.17426 15.2648C3.4481 15.9901 2.27116 15.9901 1.545 15.2648C0.818334 14.5391 0.818333 13.362 1.545 12.6362L1.70065 12.4807C1.99725 12.1845 2.47784 12.1848 2.77409 12.4814ZM7.29719 16.696C7.5903 16.9957 7.58495 17.4762 7.28525 17.7693L5.55508 19.4614C5.25538 19.7545 4.77481 19.7491 4.48171 19.4494C4.1886 19.1497 4.19395 18.6692 4.49365 18.3761L6.22382 16.684C6.52352 16.3909 7.00409 16.3963 7.29719 16.696ZM11.4811 18.118C11.7774 18.4146 11.7771 18.8952 11.4805 19.1915L9.76834 20.9015C9.63539 21.0343 9.63539 21.2492 9.76834 21.382C9.9018 21.5153 10.1186 21.5153 10.252 21.382L10.4077 21.2265C10.7043 20.9303 11.1849 20.9306 11.4811 21.2272C11.7774 21.5238 11.7771 22.0044 11.4805 22.3006L11.3248 22.4561C10.5987 23.1813 9.42171 23.1813 8.69556 22.4561C7.96889 21.7303 7.96889 20.5532 8.69556 19.8274L10.4077 18.1174C10.7043 17.8211 11.1849 17.8214 11.4811 18.118Z"
            fill="#fff"
          ></path>{" "}
          <g opacity="0.5">
            {" "}
            <path
              d="M10.8461 5.40925L8.65837 7.59037C8.25624 7.99126 7.88737 8.35901 7.59606 8.69145C7.40899 8.90494 7.22204 9.13861 7.06368 9.39679L7.04237 9.37554C7.00191 9.3352 6.98165 9.31501 6.96133 9.29529C6.58108 8.92635 6.1338 8.63301 5.64342 8.43097C5.61722 8.42018 5.59062 8.40964 5.53743 8.38856L5.2117 8.25949C4.77043 8.08464 4.65283 7.51659 4.9886 7.18184C5.95224 6.22112 7.10923 5.06765 7.6676 4.83597C8.16004 4.63166 8.692 4.56368 9.20505 4.6395C9.67514 4.70897 10.1198 4.95043 10.8461 5.40925Z"
              fill="#fff"
            ></path>{" "}
            <path
              d="M14.5816 16.8934C14.7579 17.0723 14.8749 17.1987 14.9808 17.3337C15.1204 17.5119 15.2453 17.7012 15.3542 17.8996C15.4767 18.123 15.5718 18.3616 15.7621 18.8389C15.9169 19.2274 16.4315 19.3301 16.7303 19.0322L16.8026 18.9601C17.7662 17.9993 18.9232 16.8458 19.1556 16.2891C19.3605 15.7982 19.4287 15.2678 19.3526 14.7563C19.283 14.2877 19.0408 13.8444 18.5807 13.1205L16.3857 15.3089C15.9745 15.7189 15.5974 16.0949 15.2564 16.3894C15.052 16.5659 14.8284 16.7423 14.5816 16.8934Z"
              fill="#fff"
            ></path>{" "}
          </g>{" "}
          <g opacity="0.5">
            {" "}
            <path
              d="M7.68621 14.5633C7.98263 14.2669 7.98263 13.7863 7.68621 13.4899C7.38979 13.1935 6.90919 13.1935 6.61277 13.4899L4.47036 15.6323C4.17394 15.9287 4.17394 16.4093 4.47036 16.7057C4.76679 17.0021 5.24738 17.0021 5.5438 16.7057L7.68621 14.5633Z"
              fill="#fff"
            ></path>{" "}
            <path
              d="M10.4954 17.369C10.7918 17.0726 10.7918 16.592 10.4954 16.2956C10.1989 15.9992 9.71835 15.9992 9.42193 16.2956L7.29417 18.4233C6.99774 18.7198 6.99774 19.2003 7.29417 19.4968C7.59059 19.7932 8.07118 19.7932 8.36761 19.4968L10.4954 17.369Z"
              fill="#fff"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>
    );
  }

  return (
    <svg className="h-[40px] w-[40px] shrink-0 sm:h-[40px] sm:w-[40px] lg:h-[50px] lg:w-[50px]">
      <use href={spriteIcons[icon]} />
    </svg>
  );
}

function DetailSection({ title, items = [], tone, icon }: DetailSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`relative shrink-0 after:absolute after:left-1/2 after:top-1/2 after:-z-10 after:h-full after:w-full after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:blur-md ${toneClasses[tone].glow}`}
        >
          <Icon icon={icon} />
        </div>
        <h2 className="mb-1 text-5xl font-bold text-primaryAccent">{title}</h2>
      </div>
      <div className="flex max-w-prose gap-5">
        <div className="w-9 shrink-0">
          <AnimationContainer direction="fromBottom" wrapperClass="h-full">
            <div
              className={`mx-auto h-full w-[3px] ${toneClasses[tone].line}`}
            />
          </AnimationContainer>
        </div>
        <ul className="list-inside list-disc">
          {items.map((item) => (
            <li key={item.title} className="mb-4 flex flex-col gap-0">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              {item.description ? <p>{item.description}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResultVisual({ section }: { section: CaseStudyResultSection }) {
  if (section.visual === "awesomeBooksTable1" || section.visual === "table") {
    const hiddenMobileColumn =
      section.title === "Data Accuracy"
        ? 3
        : section.title === "Attribution Improvement"
          ? 4
          : undefined;
    const hideFirstColumn = section.title === "Attribution Improvement";

    return (
      <div className="flex flex-col gap-3">
        <AwesomeBooksTable1
          table={section.table}
          hiddenMobileColumn={hiddenMobileColumn}
          hideFirstColumn={hideFirstColumn}
        />
        {section.note ? (
          <p className="text-sm text-white/80">{section.note}</p>
        ) : null}
      </div>
    );
  }

  if (section.visual === "awesomeBooksTable2") {
    return (
      <div className="flex flex-col gap-3">
        <AwesomeBooksTable2 table={section.table} hiddenMobileColumn={4} hideFirstColumn />
        {section.note ? (
          <p className="text-sm text-white/80">{section.note}</p>
        ) : null}
      </div>
    );
  }

  if (section.visual === "doughnutAB" || section.visual === "chart") {
    return (
      <div className="relative flex w-full flex-col items-center justify-center gap-2 lg:gap-6">
        <h3 className="mb-1 text-xl font-bold">Project Outcomes</h3>
        {section.note ? (
          <div className="relative top-0 max-w-max rounded-3xl bg-secondaryAccent p-4 lg:absolute lg:-left-[200px] lg:top-10">
            <p className="text-sm">{section.note}</p>
          </div>
        ) : null}
        <DoughnutAB chart={section.chart} />
      </div>
    );
  }

  return null;
}

function ResultsSection({ section }: { section: CaseStudyResultSection }) {
  const visual = <ResultVisual section={section} />;

  return (
    <div
      className={`mb-20 flex flex-col  justify-between gap-4 md:gap-10  ${section.reverse ? " " : ""}`}
    >
      <div className="flex flex-col gap-4 ">
        <h3 className="mb-1 text-5xl font-bold text-primaryAccent">
          {section.title}
        </h3>
        {section.items.length > 0 ? (
          <ul className="rounded-3xl bg-secondaryAccent">
            {section.items.map((item) => (
              <li key={item.title} className="mb-4">
                <h3 className="mb-1 text-xl font-bold">{item.title}</h3>
                {item.description ? <p>{item.description}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {visual ? (
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400/60 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
          {visual}
        </div>
      ) : null}
    </div>
  );
}

function UnderstandingMetricsSection({
  metrics,
}: {
  metrics: CaseStudyContentItem[];
}) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <section className="mb-20">
      <h3 className="mb-6 text-3xl font-bold text-primaryAccent">
        Understanding Metrics
      </h3>
      <div className="max-w-5xl">
        {metrics.map((metric) => (
          <div key={metric.title} className=" py-4 first:pt-0">
            <p>
              <strong>{metric.title}:</strong>
              {metric.description ? ` ${metric.description}` : null}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdditionalImprovementsSection({
  section,
}: {
  section: CaseStudy["additionalImprovements"];
}) {
  if (!section || (!section.intro && section.items.length === 0)) {
    return null;
  }

  return (
    <section className=" mt-10  py-10">
      <h2 className="mb-5 text-3xl font-bold ">Additional Improvements</h2>
      {section.intro ? <p className="mb-8">{section.intro}</p> : null}
      <div>
        {section.items.map((item) => (
          <div key={item.title} className="mb-3">
            <h3 className="text-xl font-bold mb-2 ">{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function getWebsiteLabel(website: string): string {
  try {
    return new URL(website).hostname.replace("www.", "");
  } catch {
    return website.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const projectStats =
    caseStudy.projectStats.length > 0
      ? caseStudy.projectStats
      : caseStudy.featuredKpis;
  const regularResults = caseStudy.results.filter(
    (section) => section.visual !== "doughnutAB" && section.visual !== "chart",
  );
  const restrictionResult = caseStudy.results.find(
    (section) => section.visual === "doughnutAB" || section.visual === "chart",
  );

  return (
    <Wrapper>
      <section className="w-screen translate-y-1 py-10 ml-[50%] -translate-x-1/2">
        <Wrapper>
          <div className="mb-16 flex flex-col justify-center gap-2">
            <div className="mb-5 text-center text-l font-bold uppercase">
              Tracking <span className="text-primaryAccent">Success</span> Story
            </div>
            <h1 className="mb-5 text-center text-5xl font-bold uppercase">
              {caseStudy.name}
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:flex-nowrap md:justify-between md:gap-1">
            <div className="max-w-full md:max-w-prose">
              <h2 className="mb-2 text-5xl font-bold">Meet the Client</h2>
              {caseStudy.intro ? (
                <p className="text-xl">
                  {caseStudy.name}
                  {caseStudy.website ? (
                    <>
                      {" "}
                      (
                      <a
                        className="text-primaryAccent"
                        href={caseStudy.website}
                      >
                        {getWebsiteLabel(caseStudy.website)}
                      </a>
                      )
                    </>
                  ) : null}{" "}
                  {caseStudy.intro}
                </p>
              ) : null}
            </div>

            <Image
              className="my-auto rounded-full bg-white object-contain aspect-square"
              width={300}
              height={300}
              alt={`${caseStudy.name} logo`}
              src={caseStudy.logo}
            />
          </div>
        </Wrapper>
      </section>

      <section className="relative mx-auto mt-10 flex flex-wrap items-top justify-between gap-10 py-10 md:flex-nowrap">
        <DetailSection
          title="Challenges"
          items={caseStudy.challenges}
          tone="red"
          icon="warning"
        />
        <DetailSection
          title="Objectives"
          items={caseStudy.objectives}
          tone="green"
          icon="rocket"
        />
      </section>

      <section className="relative mx-auto mt-10 flex flex-wrap items-start justify-between gap-10 py-10 md:flex-nowrap">
        <DetailSection
          title="Initial Setup"
          items={caseStudy.initialSetup}
          tone="red"
          icon="tracking"
        />
        <DetailSection
          title="Solutions"
          items={caseStudy.solutions}
          tone="green"
          icon="audit"
        />
      </section>

      {regularResults.length > 0 || projectStats.length > 0 ? (
        <>
          <Shapedivider classProp="translate-y-5 w-screen ml-[50%] -translate-x-1/2" />
          <section className="w-screen translate-y-1 bg-secondaryAccent py-10 ml-[50%] -translate-x-1/2">
            <Wrapper>
              <h2 className="mb-10 text-center text-5xl font-bold">
                Project Results
              </h2>
              {projectStats.length > 0 ? (
                <div className="switcher mb-20 justify-center gap-5 md:gap-10">
                  {projectStats.map((kpi) => (
                    <KpiCounter
                      key={kpi.title}
                      beforeNumber={kpi.beforeNumber}
                      number={kpi.number}
                      afterNumber={kpi.afterNumber}
                      title={kpi.title}
                      color={"text-green-500"}
                    />
                  ))}
                </div>
              ) : null}
              <UnderstandingMetricsSection
                metrics={caseStudy.understandingMetrics}
              />
              {regularResults.map((section) => (
                <ResultsSection key={section.title} section={section} />
              ))}
            </Wrapper>
          </section>
          <Shapedivider classProp="rotate-180 translate-y-[-5px] w-screen ml-[50%] -translate-x-1/2" />
        </>
      ) : null}

      {restrictionResult ? (
        <>
          <section className="mt-10 flex flex-wrap justify-between gap-10 py-10 md:flex-nowrap md:gap-2">
            <div className="basis-full md:max-w-md md:basis-1/2">
              <h2 className="text-center sm:text-start mb-6 text-5xl font-bold">
                {restrictionResult.title}
              </h2>
              {restrictionResult.items.map((item) => (
                <div key={item.title} className="mb-4">
                  <h3 className="mb-1 text-xl font-bold text-center sm:text-start">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="text-center sm:text-start">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="relative flex basis-full flex-col items-center justify-center gap-2 md:basis-1/2 md:max-w-md lg:gap-6">
              <ResultVisual section={restrictionResult} />
            </div>
          </section>
          <AdditionalImprovementsSection
            section={caseStudy.additionalImprovements}
          />
        </>
      ) : null}

      {caseStudy.testimonial ? (
        <section className="relative mt-10 py-10 text-primaryBg">
          <h2 className="mb-8 text-center text-4xl font-bold text-white md:text-5xl">
            Client Experience
          </h2>

          <div className="relative mx-auto max-w-3xl px-12 sm:px-8 py-16 text-center text-white">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 720 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="stroke-2 sm:stroke-[16px]"
                d="M72 116 Q72 86 102 80 L318 36 Q360 28 402 36 L618 80 Q648 86 648 116 L648 444 Q648 474 618 480 L402 524 Q360 532 318 524 L102 480 Q72 474 72 444 Z"
                fill="transparent"
                stroke="var(--primaryAccent)"
                strokeWidth="16"
                strokeLinejoin="round"
              />
            </svg>

            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
              <div className=" mb-4 sm:mb-12 sm:text-5xl leading-none text-[#ffc107]">
                ★★★★★
              </div>

              <p className="mb-6 sm:mb-16 sm:text-xl leading-relaxed">
                “{caseStudy.testimonial.quote}”
              </p>

              {caseStudy.testimonial.name ? (
                <p className="mb-4 text-xl sm:text-3xl text-black/45">
                  {caseStudy.testimonial.name}
                </p>
              ) : null}

              {caseStudy.testimonial.title ? (
                <p className="sm:text-lg ">{caseStudy.testimonial.title}</p>
              ) : null}
            </div>
          </div>

          <BackgroundLight />
        </section>
      ) : null}

      <Shapedivider classProp="translate-y-[5px] w-screen ml-[50%] -translate-x-1/2" />
      <div className="w-screen translate-y-1 bg-secondaryAccent ml-[50%] -translate-x-1/2">
        <CtaSection />
        <ShapedividerDark classProp="translate-y-1 w-screen ml-[50%] -translate-x-1/2" />
      </div>
      <BackToTop />
      <CalendlyBadgeWidget />
    </Wrapper>
  );
}
