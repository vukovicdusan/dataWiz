"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import logo from "../public/images/logo-hat.png";
import seatgeek from "../public/images/testimonials/SeatGeek.png";
import drberg from "../public/images/testimonials/drberg.svg";
import awesomebooks from "../public/images/testimonials/awesomeBooks.jpg";
import magnum from "../public/images/testimonials/magnum.svg";
import moengage from "../public/images/testimonials/moengage.jpg";
import prescan from "../public/images/testimonials/prescan.svg";
import glide from "../public/images/testimonials/glide.png";

const TestimonialSlider = () => {
  const testimonialsData = [
    {
      name: "Awesome Books",
      title: "Ecommerce",
      testimonial:
        "Could not recommend Igor and the DataWiz team more highly. Quick to reply to any issue, really good technical understanding of topics and feels like they are part of your team. Carry on the great work guys.",
      logo: awesomebooks,
      industrie: "Ecommerce",
    },
    {
      name: "SeatGeek",
      title: "Ecommerce",
      testimonial:
        "I work for a major company that grosses multiple billions in gross sales. We had a major issue with conversion tracking, missing many purchases despite extensive testing and communication with Google (we get white glove service based on our ad spend). Igor was instrumental in identifying and resolving the problem, working through a very complex config involving privacy/ Google Consent Mode, tag sequencing and GA4 tracking.",
      logo: seatgeek,
      industrie: "Ecommerce",
    },
    {
      name: "Dr. Berg",
      title: "Ecommerce & Health",
      testimonial:
        "Igor is highly knowledgeable when it comes to data and tracking. Igor helped us improve our shop and paid advertising tracking during the re-platforming of our website. He is highly responsive and a pleasure to work with. If you want someone to help you with your data, I highly recommend Igor.",
      logo: drberg,
      industrie: "Ecommerce & Health",
    },
    {
      name: "Magnum Insurance",
      title: "Legal",
      testimonial:
        "We've been working with DataWiz on the setup and optimization of our tagging and marketing analytics systems, and his expertise has made a significant impact on our business. From day one, he took the time to understand our unique needs and delivered a solution that not only streamlined our tracking but also provided us with more accurate and actionable data. He’s proactive in identifying areas for improvement, and his optimization efforts have helped us better monitor our marketing performance across multiple ad buying and analytical platforms. What sets DataWiz apart is his dedication to ongoing support. Even after the initial setup, he has continued to collaborate with our team, making regular adjustments and updates to ensure that everything runs smoothly and remains aligned with our evolving business goals.",
      logo: magnum,
      industrie: "Legal",
    },
    {
      name: "MoEngage",
      title: "SaaS",
      testimonial:
        "Igor has been a great asset to our team over the years. He created hundreds of reports in GA4, giving us the insights we needed to act quickly. He also developed an intricate dashboard in Looker Studio that made understanding and visualizing data easy. The insights he provided with reporting over the years have been amazing.",
      logo: moengage,
      industrie: "SaaS",
    },
    {
      name: "Prescan",
      title: "Health",
      testimonial:
        "Proceeds quickly and in an organized manner. Mutual coordination is smooth and easy. Highly recommended if you are looking for someone to set up tracking correctly.",
      logo: prescan,
      industrie: "Health",
    },
    {
      name: "Glide",
      title: "Education",
      testimonial:
        "Igor is fantastic to work with. He's incredibly quick, reliable, communicative, and professional in every interaction. The tracking, reporting, and delivery of work are always highly organized, making me feel very relaxed. It's like I don't have to think about the project at all; everything is taken care of.",
      logo: glide,
      industrie: "Education",
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
          className="px-6 py-7 rounded-2xl bg-secondaryAccent"
          key={index}
        >
          <div className="flex gap-4 items-center mb-4">
            <Image
              width={80}
              height={80}
              alt="company logo"
              src={testimonial.logo}
              className="object-contain"
            ></Image>
            <div className="flex flex-col justify-center">
              <p className="font-bold text-xl">{testimonial.name}</p>
              <p className="text-primaryAccent text-lg">{testimonial.title}</p>
            </div>
          </div>
          <p className="mb-2">{testimonial.testimonial}</p>
          {/* <p className="text-primaryAccent">{testimonial.industrie}</p> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
