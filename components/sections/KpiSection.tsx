import React from "react";
import Wrapper from "../Wrapper";
import KpiCounter from "../KpiCounter";

const KpiSection = () => {
  return (
    <Wrapper>
      <section className="mb-20 mt-20">
        <div className="switcher gap-5 md:gap-10 justify-center mb-20">
          <KpiCounter
            number={6}
            afterNumber={"y"}
            title={"Of Experience"}
          ></KpiCounter>
          <KpiCounter
            number={200}
            afterNumber={"+"}
            title={"Projects"}
          ></KpiCounter>
          <KpiCounter
            number={300}
            afterNumber={"+"}
            title={"Audits"}
          ></KpiCounter>
          <KpiCounter
            number={150}
            afterNumber={"+"}
            title={"Clients"}
          ></KpiCounter>
        </div>

        <div className="flex flex-wrap gap-20">
          <div className="grow shrink basis-[calc((40rem-100%)*999)]">
            <h3 className="text-2xl font-bold mb-5">
              Programming prowess meets{" "}
              <span className="text-primaryAccent">marketing finess </span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolor
              alias facere quia voluptate rerum quam enim minima non asperiores,
              ipsa obcaecati maxime, accusamus amet temporibus commodi adipisci
              distinctio velit. Aliquid deleniti itaque debitis ad ab laudantium
              dolores, placeat eaque.
            </p>
          </div>
          <div className="grow shrink basis-[calc((40rem-100%)*999)]">
            <h3 className="text-2xl font-bold mb-5">
              Someone that <span className="text-primaryAccent">cares</span> for
              your business, doesn't treat you like one of the accounts
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              libero optio quasi assumenda alias sit ipsa iste illum odit, rem
              placeat suscipit similique voluptatum, quo, eius repellat. Fugit
              nobis placeat, laboriosam voluptatibus magnam iste.
            </p>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default KpiSection;
