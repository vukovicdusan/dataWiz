import React from "react";
import Wrapper from "../Wrapper";
import KpiCounter from "../KpiCounter";

const KpiSection = () => {
  return (
    <div className="bg-secondaryAccent">
      <Wrapper>
        <section id="kpis" className="pb-20 pt-20">
          <div className="switcher gap-5 md:gap-10 justify-center mb-20">
            <KpiCounter
              number={6}
              afterNumber={"y"}
              title={"Of Experience"}
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

          <div className="flex flex-wrap gap-20">
            <div className="grow shrink basis-[calc((40rem-100%)*999)]">
              <h3 className="text-2xl font-bold mb-5">
                Programming prowess meets{" "}
                <span className="text-primaryAccent">marketing finess </span>
              </h3>
              <p>
                My unique blend of programming and marketing backgrounds makes
                me stand out. I'll handle the most intricate technical
                challenges while crafting tracking solutions that maximize your
                ad performance. From optimizing checkout funnels to decoding
                customer behavior, I ask the right questions and enhance your
                bottom line.
              </p>
            </div>
            <div className="grow shrink basis-[calc((40rem-100%)*999)]">
              <h3 className="text-2xl font-bold mb-5">
                Someone that <span className="text-primaryAccent">cares</span>{" "}
                for your business, doesn't treat you like one of the accounts
              </h3>
              <p>
                Unlike agencies that see you as just another account, I see each
                partnership as unique and invaluable. While agencies may
                prioritize extending contracts and conserving resources, my
                focus is solely on maximizing your business' potential. With me,
                you're not just another number – you're a priority.
              </p>
            </div>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default KpiSection;
