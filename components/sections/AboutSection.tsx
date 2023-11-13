import React from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";
import rocket from "../../public/images/rocket-about.svg";
import ShapedividerDark from "../ShapedividerDark";
import AnimationContainer from "../AnimationContainer";

const AboutSection = () => {
	return (
		<div className="bg-secondaryAccent">
			<Wrapper>
				<section id="about" className="bg-secondaryAccent">
					<AnimationContainer direction={"fromBottom"}>
						<h2 className="text-5xl font-bold text-center mb-10">
							About <span className="text-primaryAccent">Me</span>
						</h2>
					</AnimationContainer>
					<div className="flex flex-wrap-reverse justify-between mx-aut lg:flex-wrap ">
						<div className="lg:basis-1/2 md:basis-full justify-start">
							<AnimationContainer direction={"fromBottom"}>
								<p className="mb-4 text-left">
									<span className="text-primaryAccent">
										Igor{" "}
									</span>
									is a Web Analyst on a mission. He enjoys
									dissecting data to understand the
									&apos;what,&apos; the &apos;who,&apos; and
									the &apos;why&apos; questions behind it. His
									analytical and coding skills mix proves to
									be the right puzzle piece in collecting,
									measuring, and visualizing complex data from
									multiple angles. The ultimate goal – to
									create value and extract actionable insights
									from raw data. He is one of those people who
									loves their job.
								</p>
							</AnimationContainer>
							<AnimationContainer direction={"fromBottom"}>
								<p className="mb-4 text-left">
									When he&apos;s not talking about meeting
									clients&apos; targets and ROIs, he&apos;s
									probably talking about sports. He claims
									that playing sports is better than watching
									it. For those fond of martial arts, Igor is
									your go-to wushu_bjj_MMA guy.
								</p>{" "}
							</AnimationContainer>
							<AnimationContainer direction={"fromBottom"}>
								<p className="mb-4 text-left">
									He has always had a taste for adventure and
									breaking out of his comfort zone. Not
									surprisingly, you can often find him
									planning his next big trip. He&apos;s a
									globetrotter, even if he would never use
									that word.
								</p>
							</AnimationContainer>
						</div>
						<div className="lg:basis-1/2 basis-full mb-8 lg:mb-0">
							<AnimationContainer direction={"fromLeft"}>
								<Image
									className="m-auto"
									width={300}
									height={300}
									src={rocket}
									alt="rocket"
								></Image>
							</AnimationContainer>
						</div>
					</div>
				</section>
			</Wrapper>
			<ShapedividerDark classProp={"translate-y-1"}></ShapedividerDark>
		</div>
	);
};

export default AboutSection;
