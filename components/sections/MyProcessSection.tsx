import React from "react";
import Wrapper from "../Wrapper";
import Infographic from "../Infographic";
import AnimationContainer from "../AnimationContainer";

const MyProcessSection = () => {
  return (
    <section>
      <Wrapper>
        <AnimationContainer direction={"fromRight"}>
          <h2 className="text-5xl text-primaryAccent text-center mb-10 font-bold">
            My <span className="text-primaryAccent">Process</span>
          </h2>
        </AnimationContainer>
        <Infographic></Infographic>
      </Wrapper>
    </section>
  );
};

export default MyProcessSection;
