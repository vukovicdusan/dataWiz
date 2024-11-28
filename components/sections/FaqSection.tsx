import React from "react";
import Wrapper from "../Wrapper";
import BackgroundLight from "../BackgroundLight";
import AnimationContainer from "../AnimationContainer";
import FaqsLimiter from "../FaqsLimiter";

const FaqSection = () => {
  const faqs = [
    {
      title: "What’s a typical timeline for a tracking project?",
      body: (
        <>
          <p>
            A tracking project usually takes about 4-6 weeks to complete.
            <br></br> Here's how the timeline generally breaks down:
          </p>
          <ol className="list-decimal list-inside py-2 pl-2">
            <li>
              <span className="font-semibold">
                Introductory Call, Audit, Planning, and Documentation:
              </span>{" "}
              1 week
            </li>
            <li>
              <span className="font-semibold">Implementation:</span> 2-3 weeks
            </li>
            <li>
              <span className="font-semibold">Quality Assurance (QA):</span> 1-2
              weeks
            </li>
          </ol>
          <p>
            Please note that this is an average timeline that varies based on
            the project's complexity. Schedule a free consultation to get a more
            accurate timeline for your specific project.
          </p>
        </>
      ),
    },
    {
      title: "What does your pricing model look like?",
      body: (
        <>
          <p className="pb-2">
            My pricing model is designed to be flexible and fit the needs of
            each client. Based on the scope and complexity of your project, I
            offer both hourly and fixed-rate contracts. In certain cases, I
            combine the two approaches—offering a fixed rate for clearly defined
            deliverables and hourly billing for ongoing or additional services.
          </p>
          <p>
            To provide greater flexibility, I typically offer three pricing
            packages—Basic, Advanced, and Ultimate—ensuring that there is an
            option tailored to your specific requirements and budget.
          </p>
        </>
      ),
    },
    {
      title:
        "How do you tailor your services to fit the specific needs of my business?",
      body: (
        <p>
          I begin by thoroughly understanding your business, goals, and
          analytics requirements. This allows me to develop a customized
          strategy tailored specifically to your objectives. Every aspect of the
          project is designed with your unique needs in mind, ensuring that I
          deliver a solution to achieve your desired outcomes.
        </p>
      ),
    },
    {
      title: "Do you offer long-term analytics support?",
      body: (
        <>
          <p className="pb-2">
            While I’m available for quick projects and consultations, I
            prioritize long-term partnerships to help you extract maximum value
            from your data. I offer ongoing services such as data analysis,
            reporting, data quality monitoring, and tracking updates to ensure
            your analytics remain reliable and actionable.
          </p>
        </>
      ),
    },
    {
      title:
        "What are the key benefits of an analytics project for my business?",
      body: (
        <>
          <p>The key benefits of a web analytics project include:</p>
          <ol className="list-decimal list-inside py-2">
            <li>Measure Marketing Success</li>
            {/* <ul className="list-disc list-inside pl-4 pb-2">
              <li>
                Gain insights into optimizing marketing strategies, campaigns,
                and ad spending.
              </li>
            </ul> */}
            <li>Track Website Performance</li>
            {/* <ul className="list-disc list-inside pl-4 pb-2">
              <li>
                Uncover actionable insights to enhance your website’s
                performance.
              </li>
            </ul> */}
            <li>Fuel Ad Algorithms</li>
            {/* <ul className="list-disc list-inside pl-4 pb-2">
              <li>
                Boost ad performance by providing better data to ad algorithms.
              </li>
            </ul> */}
            <li>Understand Your Target Audience</li>
            {/* <ul className="list-disc list-inside pl-4 pb-2">
              <li>
                Unlock a deeper understanding of user preferences, behaviors,
                and demographics.
              </li>
            </ul> */}
            <li>Make Data-Driven Decisions</li>
            {/* <ul className="list-disc list-inside pl-4 pb-2">
              <li>
                Empower every aspect of your business with data-driven
                decisions.
              </li>
            </ul> */}
          </ol>
        </>
      ),
    },
    {
      title: "Do you work alongside our internal team?",
      body: (
        <p>
          Absolutely! I work closely with all stakeholders to craft a tracking
          and analytics strategy tailored to your business. I’m particularly
          hands-on with your development team during the tracking implementation
          process, providing detailed documentation and ongoing support.
        </p>
      ),
    },
    {
      title: "How often can I expect updates on the project's progress?",
      body: (
        <>
          <p>
            I provide regular updates and include detailed information at every
            key milestone. Typically, I update you at the following stages:
          </p>
          <ol className="list-decimal list-inside py-2 pl-2">
            <li className="pb-2">Platform Configuration</li>
            <li className="pb-2">Data Layer Testing</li>
            <li className="pb-2">Server-Side Tracking Completion</li>
            <li className="pb-2">Internal Setup Testing</li>
            <li className="pb-2">Deployment to Testing Environments</li>
            <li className="pb-2">Real Data Monitoring</li>
            <li className="pb-2">Second-Phase Quality Assurance (QA)</li>
            <li className="pb-2">Deployment to Production Environments</li>
          </ol>
          <p>
            These updates ensure you’re always aware of the project’s progress
            and can provide feedback or address questions at each stage.
          </p>
        </>
      ),
    },
    {
      title: "Which KPIs are most important for the success of my business?",
      body: (
        <p>
          KPIs vary depending on the industry and the unique goals of your
          business. I take the time to understand your specific tracking needs
          and objectives, then develop a customized measurement plan that
          identifies the most relevant KPIs to drive your success. Schedule a
          free consultation to discuss your goals and identify the KPIs that
          matter most for your business!
        </p>
      ),
    },

    {
      title: "How do you ensure data privacy and security?",
      body: (
        <>
          <p>
            I prioritize data privacy and security at every stage of the project
            by implementing the following measures:
          </p>
          <ul className="list-disc list-inside py-2 pl-2">
            <li className="pb-2">
              <span className="font-semibold">Regulatory Compliance:</span>{" "}
              Adhering to GDPR, CCPA, and other applicable data privacy laws to
              maintain legal compliance.
            </li>
            <li className="pb-2">
              <span className="font-semibold">
                Secure Tracking Configurations:
              </span>{" "}
              Using server-side tracking to reduce data exposure and enhance
              security.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Access Control:</span> Limiting
              data access strictly to authorized personnel to protect sensitive
              information.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Data Confidentiality:</span> Your
              data is never shared with third parties. It remains confidential,
              and I’m always willing to sign non-disclosure agreements (NDAs)
              for added assurance.
            </li>
          </ul>
          <p>
            These practices ensure your data is handled with the utmost
            security, confidentiality, and care.
          </p>
        </>
      ),
    },
    {
      title: "How do you ensure the data accuracy?",
      body: (
        <>
          <p>
            I follow a rigorous testing procedure to ensure data accuracy,
            quality, and completeness. The process includes:
          </p>
          <ol className="list-decimal list-inside py-2 pl-2">
            <li className="pb-2">
              <span className="font-semibold">Internal Testing:</span> I use
              tools such as GTM preview mode, debug/testing modes, network and
              console tabs, and other diagnostic tools to identify and resolve
              issues before testing the real user data.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Real-User Testing:</span> I
              evaluate user data from testing environments for all relevant
              platforms. I monitor the data for 1-3 weeks, depending on traffic
              and conversion volumes.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Setup Refinements:</span> I make
              real-time adjustments to the setup whenever issues are identified
              to ensure precision.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Client Review:</span> Before
              publishing changes to production, I review the data and tracking
              setup with you to ensure everything is aligned with your goals and
              expectations.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Ongoing Monitoring:</span> I
              continuously track data accuracy throughout the testing period,
              making necessary adjustments to ensure precision.
            </li>
          </ol>
          {/* <p>
            Changes are only published once I’m confident that the data is as
            accurate as possible, ensuring reliable and actionable insights for
            your business.
          </p> */}
        </>
      ),
    },
    {
      title:
        "Do you offer training to help our team use and interpret analytics tools effectively?",
      body: (
        <p>
          Of course! I provide training sessions for your team, ensuring you
          know how to extract the most value from your tracking setup. The
          sessions are completely customized to your needs and can cover a range
          of topics, from beginner to advanced, depending on your team's
          expertise and requirements.
        </p>
      ),
    },
  ];
  return (
    <Wrapper>
      <section id="faq" className="relative mb-32">
        <div className="mb-10">
          <AnimationContainer direction={"fromBottom"}>
            <h2 className="text-5xl font-bold text-center mb-4 uppercase">
              FAQ
            </h2>
          </AnimationContainer>
          <AnimationContainer direction={"fromTop"}>
            <p className="text-lg text-center mb-4 sm:mb-8">
              These are some of our most commonly asked questions
            </p>
          </AnimationContainer>
        </div>
        <AnimationContainer direction={"fromTop"}>
          <FaqsLimiter faqs={faqs}></FaqsLimiter>
        </AnimationContainer>
        <BackgroundLight></BackgroundLight>
      </section>
    </Wrapper>
  );
};

export default FaqSection;
