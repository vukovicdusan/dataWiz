import React from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";
import industries from "../../public/images/robotic.png";
import tools from "../../public/images/settings.png";

const IndustriesSection = () => {
  let industriesArr: string[] = [
    "ECommerce and Retail",
    "SaaS",
    "Tech and IT",
    "Finance",
    "Startups",
  ];

  let toolsArr: string[] = [
    "Google Analytics 4 (GA4)",
    "Google Tag Manager (GTM)",
    "Marketing Pixels (Google Ads, Meta Ads, Microsoft Ads, TikTok Ads, etc)",
    "Looker Studio",
    "Stape",
    "BigQuery (GBQ)",
    "Mixpanel",
    "Google Sheets",
  ];
  return (
    <Wrapper>
      <section className="mt-20 pb-10 relative">
        <div className="flex flex-row gap-4 align-middle mb-2">
          <Image
            className="invert object-contain"
            width={35}
            src={industries}
            alt="industries icon"
          ></Image>
          <h2 className="text-5xl font-bold uppercase text-primaryAccent">
            Industries
          </h2>
        </div>
        <div className="flex gap-5">
          <div className="w-9">
            <div className="w-[3px] h-full bg-[linear-gradient(0deg,rgba(0,0,0,0)0%,rgb(9,55,148)25%,rgb(46,104,221)50%,rgb(9,55,148)85%,rgba(0,0,0,0)100%)] mx-auto"></div>
          </div>
          <ul className="mt-7 pb-5">
            {industriesArr.map((industry: string, index: number) => (
              <li className="text-xl mb-4" key={index}>
                {industry}
              </li>
            ))}
          </ul>
          <svg
            className="absolute -right-1/4 top-10 height-auto animate-spin-slow"
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
        </div>
      </section>
      <section className="mb-20 relative">
        <div className="flex flex-row gap-4 align-middle mb-2">
          <Image
            className="invert object-contain"
            width={35}
            src={tools}
            alt="tools icon"
          ></Image>
          <h2 className="text-5xl font-bold uppercase text-primaryAccent">
            Tools
          </h2>
        </div>
        <div className="flex gap-5">
          <div className="w-9">
            <div className="w-[3px] h-full bg-[linear-gradient(0deg,rgba(0,0,0,0)0%,rgb(9,55,148)25%,rgb(46,104,221)50%,rgb(9,55,148)85%,rgba(0,0,0,0)100%)] mx-auto"></div>
          </div>
          <ul className="mt-7 pb-5">
            {toolsArr.map((tool: string, index: number) => (
              <li className="text-xl mb-4" key={index}>
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Wrapper>
  );
};

export default IndustriesSection;
