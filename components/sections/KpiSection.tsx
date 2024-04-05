import React from "react";
import Wrapper from "../Wrapper";
import KpiCounter from "../KpiCounter";
import AnimationContainer from "../AnimationContainer";

const KpiSection = () => {
  return (
    <div className="bg-secondaryAccent">
      <Wrapper>
      <AnimationContainer direction={"fromBottom"}>
          <h2 className="text-5xl text-white text-center mb-10 font-bold uppercase">
            What Sets Me Apart?
          </h2>
        </AnimationContainer>
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
                Lorem <span className="text-primaryAccent">ipsum</span>{" "}
                dolor sit amet
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum excepturi tenetur maxime nulla illum ullam, quia repellendus fugit reprehenderit perspiciatis nisi totam porro debitis harum error sunt necessitatibus fuga eveniet placeat temporibus officia non dolor libero modi! Molestiae, eveniet magni.
              </p>
            </div>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default KpiSection;
