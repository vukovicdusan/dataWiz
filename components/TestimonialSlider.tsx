"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import logo from "../public/images/logo-hat.png";

const TestimonialSlider = () => {
  const testimonialsData = [
    {
      name: "John Doe",
      title: "CEO",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
      logo: logo,
      industrie: "Steel Industrie",
    },
    {
      name: "Dohn Joe",
      title: "BEO",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
      logo: logo,
      industrie: "Steel Industrie",
    },
    {
      name: "Vohn Moe",
      title: "DEO",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
      logo: logo,
      industrie: "Steel Industrie",
    },
    {
      name: "Vohn Moe",
      title: "DEO",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
      logo: logo,
      industrie: "Steel Industrie",
    },
    {
      name: "Vohn Moe",
      title: "DEO",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis quos cum placeat quod eveniet deserunt, aspernatur ipsa delectus! Obcaecati vel ut tempore nulla eum, sequi cum in quidem quibusdam.",
      logo: logo,
      industrie: "Steel Industrie",
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
          <div className="flex gap-4 items-center mb-4">
            <Image
              width={50}
              height={50}
              alt="company logo"
              src={testimonial.logo}
              className="object-contain"
            ></Image>
            <div className="flex flex-col justify-center">
              <p className="font-bold">{testimonial.name}</p>
              <p>{testimonial.title}</p>
            </div>
          </div>
          <p className="mb-2">{testimonial.testimonial}</p>
          <p className="text-primaryAccent">{testimonial.industrie}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
