import React from "react";
import Wrapper from "../Wrapper";
import Infographic from "../Infographic";
import AnimationContainer from "../AnimationContainer";
import Infographic2 from "../Infographic2";

const MyProcessSection = () => {
  return (
    <section id="process">
      <Wrapper>
        <AnimationContainer direction={"fromRight"}>
          <h2 className="text-5xl text-center mb-10 font-bold uppercase">
            My <span className="text-primaryAccent">Blueprint </span>For Your
            Success
          </h2>
        </AnimationContainer>
        {/* <Infographic></Infographic> */}
        <Infographic2></Infographic2>
      </Wrapper>
    </section>
  );
};

export default MyProcessSection;
