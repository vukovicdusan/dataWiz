import AboutSection from "@/components/sections/AboutSection";
import CtaSection from "@/components/sections/CtaSection";
import FaqSection from "@/components/sections/FaqSection";
import Hero from "@/components/sections/Hero";
import MyProcessSection from "@/components/sections/MyProcessSection";
import ServiceSection from "@/components/sections/ServiceSection";
import Testimonials from "@/components/sections/Testimonials";
import Shapedivider from "@/components/Shapedivider";
import ShapedividerDark from "@/components/ShapedividerDark";
import Wrapper from "@/components/Wrapper";

export default function Home() {
	return (
		<main>
			<Hero />
			<Shapedivider classProp={""}></Shapedivider>
			<div className="bg-secondaryAccent">
				<Wrapper>
					<section className="flex flex-wrap-reverse justify-between mx-auto bg-secondaryAccent lg:flex-wrap">
						<div className="lg:basis-1/2 md:basis-full justify-start">
							<p className="mb-5 text-left">
								Welcome to{" "}
								<span className="text-primaryAccent">
									DataWiz
								</span>
								, where data meets insight and transforms your
								digital world. At our web analytics agency, we
								don&apos;t just crunch numbers; we decipher
								stories, unravel trends, and illuminate the path
								to your online success. In the ever-evolving
								landscape of the internet, understanding your
								audience is not just an advantage – it&apos;s
								imperative. With us, you&apos;re not just
								getting analytics; you&apos;re gaining a
								profound understanding of your web users. Dive
								into the heart of your data with our expert
								team, and let&apos;s turn clicks into meaningful
								connections and visits into conversions. Your
								journey to unrivaled digital intelligence starts
								here.
							</p>
						</div>
						<div className="lg:basis-1/2 md:basis-full">
							<h2 className="text-5xl mb-5 font-bold text-right ">
								Your journey to{" "}
								<span className="text-primaryAccent">
									unrivaled
								</span>{" "}
								digital intelligence starts{" "}
								<span className="text-primaryAccent">
									here.
								</span>
							</h2>
						</div>
					</section>
				</Wrapper>
			</div>
			<Shapedivider
				classProp={"rotate-180 translate-y-[-5px]"}
			></Shapedivider>
			<ServiceSection></ServiceSection>
			<MyProcessSection></MyProcessSection>
			<Shapedivider classProp={"translate-y-[5px]"}></Shapedivider>
			<CtaSection></CtaSection>
			<Shapedivider
				classProp={"rotate-180 translate-y-[-5px]"}
			></Shapedivider>
			<Testimonials></Testimonials>
			<FaqSection></FaqSection>
			<Shapedivider classProp={"translate-y-[5px]"}></Shapedivider>
			<AboutSection></AboutSection>
			<ShapedividerDark
				classProp={"translate-y-[5px]"}
			></ShapedividerDark>
		</main>
	);
}
