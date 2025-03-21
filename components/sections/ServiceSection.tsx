import React from "react";
import Wrapper from "../Wrapper";
import ServiceBox from "../ServiceBox";
import BackgroundLight from "../BackgroundLight";
import AnimationContainer from "../AnimationContainer";

const ServiceSection = () => {
  return (
    <section id="services" className="relative mb-64 z-10">
      <BackgroundLight></BackgroundLight>
      <Wrapper>
        <AnimationContainer direction={"fromBottom"}>
          <h2 className="text-5xl text-white text-center mb-10 font-bold uppercase">
            Let Me Help You With:
          </h2>
        </AnimationContainer>
        <AnimationContainer
          overflow={"overflow-visible"}
          direction={"fromBottom"}
        >
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,_minmax(min(400px,_100%),_1fr))]">
            {/* <div className="flex flex-wrap gap-3"> */}
            <ServiceBox
              service={"Website Tracking"}
              subservices={[
                [
                  "Event Tracking",
                  "Tracking key user actions such as purchases, form submissions, clicks, and page views.",
                  "Gain valuable insights to optimize your website and marketing performance.",
                ],
                [
                  "Ecommerce Tracking",
                  "Tracking ecommerce actions such as purchases, checkouts, and add-to-carts – along with product data.",
                  "Gain valuable insights to optimize marketing efforts based on revenue and purchase behavior, refine e-commerce funnels, and enhance product performance.",
                ],
                [
                  "User Tracking",
                  "Tracking user details, behavior, content consumption, and engagement patterns.",
                  "Gain a deep understanding of your audience to enhance user experience.",
                  "Tailor the customer journey, content marketing, and website design to meet their needs, preferences, and expectations.",
                ],
                [
                  "Marketing Attribution",
                  "Users often engage with multiple marketing channels before converting so it's crucial to accurately credit these channels.",
                  "Optimize marketing budgets by understanding which channels effectively drive conversions",
                ],
                [
                  "Funnel Tracking",
                  "Tracking detailed funnel behavior and drop-off rates.",
                  "Fix the leaks and ensure more users reach the final goal by understanding where and why users abandon the process.",
                ],
              ]}
              icon={"website-tracking"}
            ></ServiceBox>
            <ServiceBox
              service={"Tracking Enhancements"}
              subservices={[
                [
                  "Server-Side Tracking",
                  "Server-side tracking is an enhanced version of browser (client-side) tracking. It improves data accuracy and attribution by mitigating ad blockers and browser limitations.",
                  "This provides more and better data that enhances decision-making, and ad performance, and future-proofs your tracking.",
                ],
                [
                  "App Tracking",
                  "Tracking key mobile app events such as installs, uninstalls, updates, and notifications.",
                  "Additionally, we can track custom events like purchases, form submissions, and more.",
                  "Mobile apps are often overlooked, yet they play an increasingly important role in your business, making app tracking essential for a complete view of your user journey.",
                ],
                [
                  "Consent Mode",
                  "Consent Mode helps adapt your tracking setup to data privacy regulations like GDPR and CCPA.",
                  "A proper implementation ensures legal compliance and ensures that ad platforms function properly while minimizing data loss.",
                ],
                [
                  "Offline Tracking",
                  "Key actions can happen beyond your website, such as CRM conversions, subscription payments, and offline purchases.",
                  "Tracking these events helps you understand the full customer journey and gain a complete view of your business performance.",
                ],
                [
                  "Phone Call Tracking",
                  "Tracking phone calls, duration, call details, and conversions from phone calls.",
                  "Allows attribution of conversions to your marketing efforts and provides a complete view of the user journey.",
                  "It's crucial for companies that depend on phone calls as a significant conversion channel.",
                ],
              ]}
              icon={"tracking-strategy"}
            ></ServiceBox>
            <ServiceBox
              service={"Marketing Conversion Tracking"}
              subservices={[
                [
                  "Google Ads",
                  "In today’s highly automated Google Ads landscape, conversion tracking is just as important as campaign setup for optimizing performance.",
                  "Top-notch tracking helps maximize ad performance, makes remarketing strategies effective, and prevents wasting budget.",
                ],
                [
                  "Meta Ads",
                  "In today’s highly automated Meta Ads landscape, conversion tracking is just as important as campaign setup for optimizing performance.",
                  "Top-notch tracking helps maximize ad performance, makes remarketing strategies effective, and prevents wasting budget.",
                ],
                [
                  "Microsoft Ads",
                  "In today’s highly automated Microsoft Ads landscape, conversion tracking is just as important as campaign setup for optimizing performance.",
                  "Top-notch tracking helps maximize ad performance, makes remarketing strategies effective, and prevents wasting budget.",
                ],
                [
                  "TikTok Ads",
                  "In today’s highly automated TikTok Ads landscape, conversion tracking is just as important as campaign setup for optimizing performance.",
                  "Top-notch tracking helps maximize ad performance, makes remarketing strategies effective, and prevents wasting budget.",
                ],
                [
                  "Linkedin Ads",
                  "In today’s highly automated Linkedin Ads landscape, conversion tracking is just as important as campaign setup for optimizing performance.",
                  "Top-notch tracking helps maximize ad performance, makes remarketing strategies effective, and prevents wasting budget.",
                ],
                [
                  "Other",
                  "Going beyond the major platforms, we work with Pinterest, Twitter, Snapchat, Reddit, Taboola, Outbrain, AdRoll, and others.",
                  "In today’s highly automated landscape, conversion tracking is just as important as campaign setup for optimizing performance.",
                  "Top-notch tracking helps maximize ad performance, makes remarketing strategies effective, and prevents wasting budget.",
                ],
              ]}
              icon={"conversion-tracking"}
            ></ServiceBox>
            <ServiceBox
              service={"Tracking Audit & Planning"}
              subservices={[
                [
                  "GA4 Audit",
                  "Our detailed 80+ checkpoint audit examines data collection, data processing, and reporting to ensure it follows GA4 best practices.",
                  "The audit identifies any issues and areas for improvement. We also evaluate data processing to improve data quality and ensure accurate reporting.",
                  "This audit ensures your GA4 setup is clean, organized, and optimized, providing reliable insights to drive your business forward.",
                ],
                [
                  "GTM Audit",
                  "Our 50+ checkpoint audit ensures that your data collection is top-notch, maximizing data accuracy and quality. We assess your setup to ensure it is organized, clean, and efficient.",
                  "The audit focuses on making tracking as durable as possible while minimizing any impact on site speed.",
                  "This ensures that your analytics deliver valuable insights and your marketing efforts achieve enhanced ad performance.",
                ],
                [
                  "Ad Platform Audits",
                  "Marketing audits ensure that ad platforms receive all the data they need to maximize ad performance and leverage remarketing effectively.",
                  "Also providing the necessary data for detailed analytics, helping you make informed decisions and optimize your marketing strategy.",
                ],
                [
                  "Measurement Plan",
                  "The measurement plan serves as a strategic blueprint, defining events, parameters, metrics, and goals to ensure all tracking elements align with your business objectives.",
                  "It provides a structured approach to guarantee that implementation runs smoothly and effectively.",
                ],
                [
                  "UTM Strategy",
                  "UTM parameters are crucial for accurate traffic attribution. Our strategy outlines how to effectively use UTMs to measure your marketing impact. The structured approach ensures that each link is tagged consistently and accurately. ",
                  "With a solid UTM plan, you gain a comprehensive understanding of your campaign performance and the ability to make data-driven decisions to optimize your marketing strategy.",
                ],
                [
                  "Data Layer Documentation",
                  "DataLayers provide the most accurate and reliable setup for tracking. This document details the specific data elements, their definitions, and their structure.",
                  "Serving as a key reference for both implementation and troubleshooting. It simplifies setup for your development team and enhances data collection accuracy, ensuring a solid foundation for effective analytics and marketing.",
                ],
              ]}
              icon={"tracking-audit"}
            ></ServiceBox>

            <ServiceBox
              service={"Reporting & Visualization"}
              subservices={[
                [
                  "GA4",
                  "Enhancing GA4's built-in reports and creating custom reports in the Explore section to transform raw data into actionable insights.",
                  "Available reports include marketing, e-commerce, funnel, user path, segment overlap, and user explorer.",
                  "While GA4 is sufficient for simpler reports, we recommend using Looker Studio for more advanced needs.",
                ],
                [
                  "Looker Studio",
                  "This highly customizable interactive and user-friendly reporting tool consolidates data from multiple sources into a single, comprehensive view.",
                  "Apart from extensive design and branding options with a wide range of visualization methods at users’ disposal also allows to generate stakeholder-tailored reports with varying levels of detail.",
                  "Looker Studio enables you to get the most out of your data, driving growth and maximizing your business potential.",
                ],
                [
                  "Reporting Automation",
                  "Save time by eliminating manual reporting tasks. Automate all your reporting needs.",
                  "We streamline the process and enhance reports for deeper insights, allowing you to focus on strategic decisions instead of data extraction.",
                ],
              ]}
              icon={"reporting-visualization"}
            ></ServiceBox>
            <ServiceBox
              service={"Analysis"}
              subservices={[
                [
                  "Marketing",
                  "The marketing analysis examines the performance of your marketing campaigns to uncover actionable insights. We analyze key metrics such as conversion rates, customer acquisition costs, and campaign ROI to understand what drives success.",
                  "By examining user interactions and engagement across various channels, we help you identify strengths and areas for improvement.",
                  "Our goal is to provide you with a clear picture of how your marketing efforts are performing, enabling data-driven decisions to optimize strategies and maximize return on investment.",
                ],
                [
                  "Website",
                  "The website analysis involves evaluating essential functionalities, page performance, and user journeys to enhance the overall effectiveness of your site.",
                  "By examining key pages, content, and navigation paths, we identify opportunities to improve user experiences and conversion rates.",
                  "Gain insights to transform your website into a conversion-generating powerhouse.",
                ],
                [
                  "Ecommerce",
                  "The e-commerce analysis examines essential metrics such as purchases, revenue, checkouts, and add-to-cart events.",
                  "By examining these key actions, we gain insights into revenue patterns and purchase behavior, enabling us to refine marketing strategies, optimize e-commerce funnels, and improve product performance.",
                  "This analysis helps in making data-driven decisions to drive growth and enhance overall e-commerce effectiveness.",
                ],
                [
                  "User",
                  "The user analysis involves examining user details, behavior, and content consumption to gain deep insights into your target audience.",
                  "By analyzing this data, we can identify patterns and preferences, enabling us to enhance the user experience and tailor strategies to better meet their needs.",
                  "This approach helps optimize overall performance, ensuring that your marketing and engagement efforts are both effective and aligned with user expectations.",
                ],
                [
                  "Funnel",
                  "The funnel analysis examines user behavior through each stage of your funnel and identifies where drop-offs occur.",
                  "By understanding the reasons behind user abandonment, we can address these issues and refine the funnel, ensuring more users reach the final goal.",
                  "This analysis helps optimize the conversion path, enhancing overall performance and boosting conversion rates.",
                ],
              ]}
              icon={"analysis"}
            ></ServiceBox>

            <ServiceBox
              service={"Consultation & Education"}
              subservices={[
                // [
                //   "Strategy & Planning",
                //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                // ],
                // [
                //   "Tracking Consultation",
                //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                // ],
                // [
                //   "Analytics Consultation",
                //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                // ],
                // [
                //   "Reporting Consultation",
                //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo obcaecati mollitia repudiandae, quasi quaerat!",
                // ],
                [
                  "Consultation",
                  "Our consultation services are designed to help you optimize your analytics strategy and achieve your business goals.",
                  "Whether you’re starting from scratch or looking to refine your existing tracking setup, we provide expert guidance tailored to your unique needs.",
                ],
                [
                  "Education",
                  "Our customized education services are designed to equip your team with essential web analytics knowledge tailored to your needs.",
                  "We offer training sessions and workshops covering the basics of web analytics, making updates to your setup, and creating insightful reports.",
                  "By enhancing your team’s understanding of tools like GA4, GTM, and Looker Studio, they’ll maximize the value of your tracking setup and drive better digital performance.",
                ],
              ]}
              icon={"consultation"}
            ></ServiceBox>
          </div>
        </AnimationContainer>
      </Wrapper>
    </section>
  );
};

export default ServiceSection;
