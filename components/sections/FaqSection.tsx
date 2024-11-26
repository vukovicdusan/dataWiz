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
      title:
        "How do you tailor your services to fit the specific needs of my business?",
      body: (
        <p>
          I take the time to understand your business and analytics needs. Based
          on this, we create a customized plan that is 100% tailored to your
          objectives, ensuring you get the results as quickly as possible. Every
          project we handle is designed to meet your unique requirements and
          drive the outcomes you're aiming for.
        </p>
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
        "Do you offer long-term analytics support and monitoring services?",
      body: (
        <>
          <p className="pb-2">
            While I’m available for quick projects and consultations, I
            prioritize long-term partnerships to help you extract maximum value
            from your data. I offer ongoing services such as data analysis,
            reporting, data quality monitoring, and tracking updates to ensure
            your analytics remain reliable and actionable.
          </p>
          <p>
            Although I design setups to be as durable as possible, tracking
            systems require regular monitoring and updates to maintain data
            accuracy and adapt to changes over time. Additionally, data alone is
            passive—it’s through analysis and actionable insights that you can
            drive meaningful results and profit from your efforts. My long-term
            services ensure you can trust your data and consistently turn it
            into value.
          </p>
        </>
      ),
    },
    {
      title:
        "What are the key benefits of an analytics project for my business?",
      body: (
        <ol className="list-decimal list-inside py-2">
          <li>Measure Marketing Success</li>
          <ul className="list-disc list-inside pl-4 pb-2">
            <li>
              Gain insights into optimizing marketing strategies, campaigns, and
              ad spending.
            </li>
          </ul>
          <li>Track Website Performance</li>
          <ul className="list-disc list-inside pl-4 pb-2">
            <li>
              Uncover actionable insights to enhance your website’s performance.
            </li>
          </ul>
          <li>Fuel Ad Algorithms</li>
          <ul className="list-disc list-inside pl-4 pb-2">
            <li>
              Boost ad performance by providing better data to ad algorithms.
            </li>
          </ul>
          <li>Understand Your Target Audience</li>
          <ul className="list-disc list-inside pl-4 pb-2">
            <li>
              Unlock a deeper understanding of user preferences, behaviors, and
              demographics.
            </li>
          </ul>
          <li>Make Data-Driven Decisions</li>
          <ul className="list-disc list-inside pl-4 pb-2">
            <li>
              Empower every aspect of your business with data-driven decisions.
            </li>
          </ul>
        </ol>
      ),
    },
    {
      title:
        "What are the key benefits of an analytics project for my business?",
      body: (
        <p>
          Absolutely. Collaborating with your internal team is a top priority. I
          work closely with all stakeholders to craft a tracking and analytics
          strategy tailored to your business. I’m particularly hands-on with
          your development team during the tracking implementation process,
          providing detailed documentation and ongoing support.
        </p>
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
      title: "How often can I expect updates on the project's progress?",
      body: (
        <>
          <p>
            Keeping you informed throughout the project is a top priority. I
            provide regular updates and include detailed information at every
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
      title: "How do you ensure data privacy and security for your clients?",
      body: (
        <>
          <p>
            I prioritize data privacy and security in every project. This
            includes:
          </p>
          <ul className="list-disc list-inside py-2 pl-2">
            <li className="pb-2">
              <span className="font-semibold">
                Compliance with Regulations:
              </span>{" "}
              Adhering to GDPR, CCPA, and other relevant data privacy laws to
              ensure legal compliance.
            </li>
            <li className="pb-2">
              <span className="font-semibold">
                Secure Tracking Implementations:
              </span>{" "}
              Configuring server-side tracking to minimize data exposure and
              enhance security.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Access Control:</span> Restricting
              data access to authorized personnel only, safeguarding sensitive
              information.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Data Confidentiality:</span> I do
              not share your data with any third parties. Your data remains
              confidential, and I’m more than happy to sign non-disclosure
              agreements (NDAs) to further ensure your peace of mind.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Regular Audits:</span> Conducting
              routine audits to verify data accuracy and compliance with privacy
              standards.
            </li>
          </ul>
          <p>
            By following these practices, I ensure your data is protected,
            confidential, and handled with the highest level of security and
            care.
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
              <span className="font-semibold">Internal Testing:</span> Using
              tools such as GTM preview mode, debug/testing modes, network and
              console tabs, and other diagnostic tools to identify and resolve
              issues before testing with real users.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Real-User Testing:</span> To
              ensure the highest data quality, I test the setup with actual
              users. I create testing environments for all relevant platforms
              and monitor the data quality for 1-3 weeks, depending on traffic
              and conversion volumes.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Ongoing Monitoring:</span> I
              continuously track data accuracy throughout the testing period,
              making necessary adjustments to ensure precision.
            </li>
            <li className="pb-2">
              <span className="font-semibold">Client Review:</span> Before
              publishing changes to production, I review the data and tracking
              setup with you to ensure everything is aligned with your goals and
              expectations.
            </li>
          </ol>
          <p>
            Changes are only published once I’m confident that the data is as
            accurate as possible, ensuring reliable and actionable insights for
            your business.
          </p>
        </>
      ),
    },
    {
      title:
        "Do you offer training to help our team use and interpret analytics tools effectively?",
      body: (
        <p>
          Absolutely! I provide training sessions for your team, ensuring you
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
