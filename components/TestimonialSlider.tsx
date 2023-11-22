"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const TestimonialSlider = () => {
	const testimonialsData = [
		{
			name: "John Doe",
			title: "CEO",
			testimonial:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
		},
		{
			name: "Dohn Joe",
			title: "BEO",
			testimonial:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
		},
		{
			name: "Vohn Moe",
			title: "DEO",
			testimonial:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
		},
		{
			name: "Vohn Moe",
			title: "DEO",
			testimonial:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
		},
		{
			name: "Vohn Moe",
			title: "DEO",
			testimonial:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
		},
	];
	return (
		<Swiper
			className="px-4 sm:px-0 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-[linear-gradient(90deg,rgba(2,3,21,1)0%,rgba(0,0,0,0)100%)] sm:before:w-2/5 before:w-4 before:h-full before:z-10 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-[linear-gradient(-90deg,rgba(2,3,21,1)0%,rgba(0,0,0,0)100%)] sm:after:w-2/5 after:w-4 after:h-full after:z-10"
			slidesPerView={3}
			spaceBetween={20}
			loop={true}
			modules={[Navigation]}
			navigation
			breakpoints={{
				0: { slidesPerView: 1 },
				500: { slidesPerView: 2, centeredSlides: true },
				1000: {
					slidesPerView: 3,
				},
			}}
		>
			{testimonialsData.map((testimonial, index) => (
				<SwiperSlide
					className="px-4 py-6 rounded-2xl bg-secondaryAccent"
					key={index}
				>
					<p className="font-bold">{testimonial.name}</p>
					<p className="mb-4">{testimonial.title}</p>
					<p>{testimonial.testimonial}</p>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default TestimonialSlider;
