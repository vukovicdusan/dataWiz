import React from "react";
import Wrapper from "../Wrapper";

const KpiSection = () => {
  return (
    <Wrapper>
      <section className="mb-20 mt-20">
        <div className="switcher gap-10 justify-center mb-20">
          <div className="text-center bg-secondaryAccent rounded-3xl py-6 px-4">
            <p className="text-8xl font-bold text-primaryAccent mb-2">200+</p>
            <p className="font-bold">Projects</p>
          </div>
          <div className="text-center bg-secondaryAccent rounded-3xl py-6 px-4">
            <p className="text-8xl font-bold text-primaryAccent mb-2">6y</p>
            <p className="font-bold">Of Experience</p>
          </div>
          <div className="text-center bg-secondaryAccent rounded-3xl py-6 px-4">
            <p className="text-8xl font-bold text-primaryAccent mb-2">300+</p>
            <p className="font-bold">Audits</p>
          </div>
          <div className="text-center bg-secondaryAccent rounded-3xl py-6 px-4">
            <p className="text-8xl font-bold text-primaryAccent mb-2">150+</p>
            <p className="font-bold">Clients</p>
          </div>
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
