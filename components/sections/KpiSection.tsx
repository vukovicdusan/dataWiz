import React from "react";
import Wrapper from "../Wrapper";
import KpiCounter from "../KpiCounter";
import AnimationContainer from "../AnimationContainer";

const KpiSection = () => {
  return (
    <div className="bg-secondaryAccent sm:py-0 py-10">
      <Wrapper>
        <AnimationContainer direction={"fromBottom"}>
          <h2 className="text-5xl text-white text-center mb-10 font-bold uppercase">What Sets Me Apart?</h2>
        </AnimationContainer>
        <section id="kpis">
          <AnimationContainer direction={"fromBottom"}>
            <div className="switcher gap-5 md:gap-10 justify-center mb-20">
              <KpiCounter size="lg" number={6} afterNumber={"y"} title={"Experience"}></KpiCounter>
              {/* </AnimationContainer> */}
              {/* <AnimationContainer direction={"fromBottom"} delay={"delay-200"}> */}
              <KpiCounter size="lg" number={150} afterNumber={"+"} title={"Clients"}></KpiCounter>
              {/* </AnimationContainer> */}
              {/* <AnimationContainer direction={"fromBottom"} delay={"delay-500"}> */}
              <KpiCounter size="lg" number={300} afterNumber={"+"} title={"Projects"}></KpiCounter>
              {/* </AnimationContainer> */}
              {/* <AnimationContainer direction={"fromBottom"} delay={"delay-700"}> */}
              <KpiCounter size="lg" beforeNumber={"+"} number={20} afterNumber={"%"} title={"AVG Revenue Increase"}></KpiCounter>
            </div>
          </AnimationContainer>

          <div className="flex flex-wrap gap-20">
            <div className="grow shrink basis-[calc((40rem-100%)*999)]">
              <AnimationContainer direction={"fromBottom"}>
                <h3 className="text-2xl font-bold mb-5">Programming prowess meets marketing finesse</h3>
                <p>My unique blend of programming and marketing backgrounds makes me stand out. I'll handle the most intricate technical challenges while crafting tracking solutions that maximize your ad performance. From optimizing checkout funnels to decoding customer behavior, I ask the right questions to enhance your bottom line.</p>
              </AnimationContainer>
            </div>
            <div className="grow shrink basis-[calc((40rem-100%)*999)]">
              <AnimationContainer direction={"fromBottom"} delay={"delay-200"}>
                <h3 className="text-2xl font-bold mb-5">Your true partner over agency experience</h3>
                <p>Unlike agencies that see you as just another account, I treat your project as my own. Rather than giving you the bare minimum to keep you as a client, I focus on real results. Where standard service falls short, I prioritize maximizing your business's potential. With me, you're not just another number – you're a priority.</p>
              </AnimationContainer>
            </div>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default KpiSection;
