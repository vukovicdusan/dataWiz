import Wrapper from "@/components/Wrapper";
import React from "react";
import dataWizLogo from "../../../public/images/logo-hat-star.png";
import awesomeBooksLogo from "../../../public/images/awesome-books-removebg.avif";
import Image from "next/image";
import type { Metadata } from "next";
import Shapedivider from "@/components/Shapedivider";
import AnimationContainer from "@/components/AnimationContainer";
import AwesomeBooksTable1 from "@/components/tables/AwesomeBooksTable1";
import AwesomeBooksTable2 from "@/components/tables/AwesomeBooksTable2";
import DoughnutAB from "@/components/charts/DoughnutAB";
import KpiCounter from "@/components/KpiCounter";
import CtaSection from "@/components/sections/CtaSection";
import BackToTop from "@/components/BackToTop";
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget";
import ShapedividerDark from "@/components/ShapedividerDark";

export const metadata: Metadata = {
  title: "DataWiz - Success Stories - Awesome Books",
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

const awesomeBooks = () => {
  return (
    <Wrapper>
      <section className="relative flex flex-col justify-center items-center mx-auto gap-10  md:h-[50vh] py-10 mt-10">
        <div className="flex gap-2 flex-col justify-center">
          <div className="text-l mb-5 font-bold uppercase text-center">
            Tracking <span className="text-primaryAccent">Success</span> Story
          </div>
          <h1 className="text-5xl mb-5 font-bold uppercase text-center">
            Awesome Books
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Image
            className="object-contain "
            width={150}
            alt="dataWiz logo"
            src={dataWizLogo}
          ></Image>
        </div>
      </section>
      <Shapedivider
        classProp={"translate-y-[5px] w-screen ml-[50%] -translate-x-1/2"}
      ></Shapedivider>
      <section className="bg-secondaryAccent translate-y-1 w-screen ml-[50%] -translate-x-1/2 py-10">
        <Wrapper>
          <div className="flex md:flex-nowrap flex-wrap gap-8 md:gap-1 items-center justify-center md:justify-between">
            <div className="md:max-w-prose max-w-full">
              <h2 className="font-bold text-5xl mb-2">Meet the Client</h2>
              <p className="text-xl">
                AwesomeBooks (
                <a className="text-primaryAccent" href="awesomebooks.com">
                  awesomebooks.com
                </a>
                ) is a global online bookstore offering millions of new and used
                books at affordable prices. With a mission to make books
                accessible to everyone, they combine sustainable practices with
                a wide selection that serves readers worldwide.
              </p>
            </div>

            <Image
              className="object-contain my-auto rounded-full bg-white"
              width={300}
              alt="dataWiz logo"
              src={awesomeBooksLogo}
            ></Image>
          </div>
        </Wrapper>
      </section>
      <Shapedivider
        classProp={
          "rotate-180 translate-y-[-5px] w-screen ml-[50%] -translate-x-1/2"
        }
      ></Shapedivider>
      <section className="relative flex md:flex-nowrap flex-wrap justify-between items-center mx-auto gap-10  py-10 mt-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative after:w-full after:h-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:bg-[rgba(232,9,9,0.4)] after:blur-md after:-z-10 after:rounded-full shrink-0">
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
                </div>
            <h2 className="font-bold text-5xl mb-1 text-primaryAccent">
              Challenges
            </h2>
          </div>
          <div className="max-w-prose flex gap-5">
            <div className="w-9 shrink-0">
              <AnimationContainer
                direction={"fromBottom"}
                wrapperClass={"h-full"}
              >
                <div className="w-[3px] h-full bg-[linear-gradient(0deg,rgba(0,0,0,0)0%,rgb(224,114,114)25%,rgb(219,15,15)50%,rgb(224,114,114)85%,rgba(0,0,0,0)100%)] mx-auto"></div>
              </AnimationContainer>
            </div>
            <ul className="list-disc list-inside">
              <li className="flex flex-col gap-0 mb-4">
                <h3 className="text-xl font-bold">Low Data Accuracy</h3>
                <p>Negatively impacts ad performance.</p>
              </li>
              <li className="flex flex-col gap-0 mb-4">
                <h3 className="text-xl font-bold">Missing User Data</h3>{" "}
                <p>
                  Leaves gaps in attribution, reducing accuracy and weakening
                  campaign performance.
                </p>
              </li>
              <li className="flex flex-col gap-0 mb-4">
                <h3 className="text-xl font-bold">
                  Incomplete Platform Tracking
                </h3>{" "}
                <p>
                  Missing data from multiple platforms hindered ad performance
                  and limited campaign optimization.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 mb-4">
          <div className="relative after:w-full after:h-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:bg-[rgba(2,252,23,0.4)] after:blur-md after:-z-10 after:rounded-full shrink-0">
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
          </div>
            <h2 className="font-bold text-5xl mb-1 text-primaryAccent">
              Objectives
            </h2>
          </div>
          <div className="max-w-prose flex gap-5">
            <div className="w-9 shrink-0">
              <AnimationContainer
                direction={"fromBottom"}
                wrapperClass={"h-full"}
              >
                <div className="w-[3px] h-full bg-[linear-gradient(0deg,rgba(0,0,0,0)0%,rgb(120,245,133)25%,rgb(9,148,23)50%,rgb(120,245,133)85%,rgba(0,0,0,0)100%)] mx-auto"></div>
              </AnimationContainer>
            </div>
            <ul className="list-disc list-inside">
              <li className="flex flex-col gap-0 mb-4">
                <h3 className="text-xl font-bold">High Data Accuracy</h3>
                <p>
                  Reliable tracking improves ad performance and enables
                  confident decision-making.
                </p>
              </li>
              <li className="flex flex-col gap-0 mb-4">
                <h3 className="text-xl font-bold">Improved Attribution</h3>{" "}
                <p>
                  Clearer attribution shows the true value of each channel and
                  boosts campaign performance.
                </p>
              </li>
              <li className="flex flex-col gap-0 mb-4">
                <h3 className="text-xl font-bold">
                  Complete Platform Tracking
                </h3>{" "}
                <p>
                  Implemented tracking across all platforms to capture full
                  performance data, enabling efficient ad optimization and
                  better decision-making.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <svg
          className="absolute -right-1/4 top-10 height-auto animate-spin-slow -z-10"
          viewBox="76.603 60.569 258.908 258.908"
          xmlns="http://www.w3.org/2000/svg"
          width={600}
          height={600}
        >
          <ellipse
            stroke="#111833"
            fill="transparent"
            cx="206.057"
            cy="190.023"
            rx="129.454"
            ry="129.454"
            transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
          />
          <ellipse
            stroke="#111833"
            fill="#111833"
            cx="249.406"
            cy="183.492"
            rx="6.532"
            ry="6.532"
            transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
          />
          <ellipse
            stroke="#111833"
            fill="#111833"
            cx="267.814"
            cy="129.454"
            rx="6.532"
            ry="6.532"
            transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
          />
          <ellipse
            stroke="#111833"
            fill="#111833"
            cx="258.312"
            cy="257.72"
            rx="6.532"
            ry="6.532"
            transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
          />
          <ellipse
            stroke="#111833"
            fill="#111833"
            cx="131.234"
            cy="232.779"
            rx="6.532"
            ry="6.532"
            transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
          />
          <ellipse
            stroke="#111833"
            fill="transparent"
            cx="205.463"
            cy="190.024"
            rx="86.105"
            ry="86.105"
            transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
          />
          <ellipse
            stroke="#111833"
            fill="transparent"
            cx="206.947"
            cy="189.926"
            rx="44.24"
            ry="44.24"
            transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
          />
        </svg>
      </section>
      <section className="relative flex md:flex-nowrap flex-wrap justify-between items-start mx-auto gap-10  py-10 mt-10">
        <div className="max-w-prose md:basis-1/2 basis-full">
          <h2 className="text-5xl font-bold mb-4">Initial Setup</h2>
          <ul className="rounded-3xl bg-secondaryAccent p-6">
            <li className="mb-4">
              <h3 className="text-xl font-bold mb-1">
                Tracking Configuration:{" "}
              </h3>
              <p>
                {" "}
                Tracking was split between GTM and hardcoded scripts, leading to
                conflicts, data duplication, and gaps, while dataLayers failed
                to capture all required data.
              </p>
            </li>
            <li className="mb-4">
              <h3 className="text-xl font-bold mb-1">Tracking Method: </h3>
              <p>
                The client used client-side tracking, which is prone to being
                blocked by ad blockers, iOS restrictions, and other tracking
                prevention systems, resulting in worse accuracy and worse
                attribution.
              </p>
            </li>
          </ul>
        </div>
        <div className="max-w-prose md:basis-1/2 basis-full">
          <h2 className="text-5xl font-bold mb-4">Solutions</h2>
          <ul className="rounded-3xl bg-secondaryAccent p-6">
            <li className="mb-4">
              <h3 className="text-xl font-bold mb-1">
                Tracking Configuration:{" "}
              </h3>
              <p>
                All tracking was centralized using Google Tag Manager (GTM) to
                manage GA4, Google Ads, Meta, TikTok, Pinterest, Reddit, and
                Microsoft Ads tracking in one place. In collaboration with the
                development team, I helped implement e-commerce dataLayers,
                ensuring a robust and well-documented event tracking setup.
              </p>
            </li>
            <li className="mb-4">
              <h3 className="text-xl font-bold mb-1">Tracking Method: </h3>
              <p>
                {" "}
                A custom server-side tracking setup was implemented using Stape.
                This approach enhances data accuracy, improves attribution,
                provides more control over data, allows for data enrichment, and
                even slightly improves site speed.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <Shapedivider
        classProp={"translate-y-5 w-screen ml-[50%] -translate-x-1/2"}
      ></Shapedivider>
      <section className=" bg-secondaryAccent translate-y-1 w-screen ml-[50%] -translate-x-1/2 py-10">
        <Wrapper>
          <h2 className="text-5xl font-bold mb-10 text-center">
            Project Results
          </h2>
          <div className="switcher gap-5 md:gap-10 justify-center mb-20">
            <KpiCounter
              number={6}
              afterNumber={"y"}
              title={"Experience"}
            ></KpiCounter>
            <KpiCounter
              number={150}
              afterNumber={"+"}
              title={"Clients"}
            ></KpiCounter>
            <KpiCounter
              number={300}
              afterNumber={"+"}
              title={"Projects"}
            ></KpiCounter>
            <KpiCounter
              beforeNumber={"+"}
              number={20}
              afterNumber={"%"}
              title={"AVG Revenue Increase"}
            ></KpiCounter>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-start mb-20 gap-4 md:gap-10">
            <div className="flex md:basis-[50% - 2rem] basis-full flex-col md:max-w-md max-w-full gap-4">
              <h3 className="font-bold text-5xl mb-1 text-primaryAccent">
                Data Accuracy
              </h3>
              <ul className="rounded-3xl bg-secondaryAccent">
                <li className="mb-4">
                  <h3 className="text-xl font-bold mb-1">
                    Understanding the Metric{" "}
                  </h3>
                  <p>
                    Data accuracy measures the percentage of actual purchases
                    that are successfully recorded in each platform. The data
                    accuracy should be as close to 100% as possible, but we
                    should also avoid inflated data, which can skew results and
                    lead to misleading conclusions.
                  </p>
                </li>
                <li className="mb-4">
                  <h3 className="text-xl font-bold mb-1">Business Impact</h3>
                  <ul>
                    <li className="mb-2">
                      <strong>Ad Performance:</strong> With more conversion
                      data, ad platforms can optimize targeting, bidding, and
                      delivery more effectively, maximizing return on ad spend
                      and reducing wasted budget.
                    </li>
                    <li className="mb-2">
                      <strong>Data Analysis:</strong> More data ensures we get
                      the full picture, so we don’t miss important insights and
                      can more effectively analyze and optimize marketing and
                      website performance.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="md:basis-[50% - 2rem] basis-full md:min-w-[15rem] min-w-full sm:overflow-auto overflow-x-scroll">
              <AwesomeBooksTable1></AwesomeBooksTable1>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-start flex-col-reverse md:flex-row gap-4 md:gap-10">
            <div className="md:basis-[50% - 2rem] basis-full md:min-w-[15rem] min-w-full sm:overflow-auto overflow-x-scroll">
              <AwesomeBooksTable2></AwesomeBooksTable2>
            </div>
            <div className="flex flex-col md:basis-[50% - 2rem] basis-full md:max-w-md max-w-full gap-4">
              <h3 className="font-bold text-5xl mb-1 text-primaryAccent">
                Marketing Attribution
              </h3>
              <ul className="rounded-3xl bg-secondaryAccent">
                <li className="mb-4">
                  <h3 className="text-xl font-bold mb-1">
                    Understanding the Metric{" "}
                  </h3>
                  <p>
                    Marketing attribution represents key health metrics that
                    show how effectively marketing platforms assign credit for
                    conversions across different channels.
                  </p>
                </li>
                <li className="mb-4">
                  <h3 className="text-xl font-bold mb-1">Business Impact</h3>
                  <ul>
                    <li className="mb-2">
                      <strong>Ad Performance:</strong> Accurate attribution
                      allows ad platforms to allocate credit to the right
                      touchpoints, improving campaign targeting, bidding, and
                      budget allocation. This leads to better return on ad spend
                      and more effective use of marketing resources.
                    </li>
                    <li className="mb-2">
                      <strong>Data Analysis:</strong> When attribution is
                      accurate, businesses can make informed decisions based on
                      reliable data, optimizing future campaigns and improving
                      overall marketing strategy.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </Wrapper>
      </section>
      <Shapedivider
        classProp={
          "rotate-180 translate-y-[-5px] w-screen ml-[50%] -translate-x-1/2"
        }
      ></Shapedivider>
      <section className="flex flex-wrap md:flex-nowrap justify-between py-10 mt-10 gap-10 md:gap-2">
        <div className="md:max-w-md max-w-full md:basis-1/2 basis-full">
          <h2 className="text-5xl font-bold mb-6">
            Overcoming Tracking Restrictions
          </h2>
          <h3 className="text-xl font-bold mb-1">Understanding the Metric </h3>
          <p className="mb-4">
            This metric represents the percentage of users who employ ad
            blockers, browser restrictions, iOS tracking prevention, or other
            similar technologies that limit or prevent tracking. While not all
            of these users necessarily block tracking right now, it reflects the
            potential for data loss as these technologies evolve.
          </p>
          <h3 className="text-xl font-bold mb-2">Business Impact</h3>
          <ul>
            <li className="mb-2">
              <strong>Tracking Accuracy:</strong> Server-side tracking bypasses
              current tracking restrictions, ensuring high data accuracy and
              attribution.
            </li>
            <li className="mb-2">
              <strong>Future Resilience:</strong>As tracking prevention systems
              evolve, server-side tracking provides a future-proof solution.
            </li>
          </ul>
        </div>
        <div className="relative flex flex-col md:basis-1/2 basis-full md:max-w-md max-w-full justify-center items-center gap-2 lg:gap-6 min-w-[25rem]">
          <h3 className="text-xl font-bold mb-1">Project Outcomes</h3>
          <div className="relative lg:absolute top-0 lg:top-10 lg-0 lg:-left-[200px] rounded-3xl bg-secondaryAccent max-w-max p-4">
            <p className="text-sm">
              Note: We bypassed these restrictions<br></br> with server side
              tracking.
            </p>
          </div>
          <DoughnutAB></DoughnutAB>
        </div>
      </section>
      <section className="py-10 mt-10 ">
        <h2 className="text-5xl font-bold mb-6 text-center">
          Client Experience
        </h2>
        <div className="text-l mb-5 font-bold uppercase text-center text-primaryAccent">
          Review
        </div>
        <p className="text-center max-w-prose mx-auto mb-4 text-2xl font-bold">
          “Could not recommend Igor and DataWiz more highly. Quick to reply to
          any issue, really good technical understanding of topics, and feels
          like they are part of your team. Carry on the great work guys.”
        </p>
        <p className="text-center italic">Mubin A.</p>
        <p className="text-center italic">Director</p>
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

export default awesomeBooks;
