import Wrapper from "@/components/Wrapper";
import React from "react";
import dataWizLogo from "../../../public/images/logo-hat-star.png";
import awesomeBooksLogo from "../../../public/images/awesome-books-removebg.avif";
import Image from "next/image";

const awesomeBooks = () => {
  return (
    <Wrapper>
      <section className="relative flex flex-col justify-center items-center mx-auto gap-10  md:h-[50vh] pt-10 mt-10">
        <div className="flex gap-2 flex-col justify-center w-[50rem]">
          <div className="text-5xl mb-5 font-bold uppercase self-start">
            Tracking <span className="text-primaryAccent">Success</span> Story
          </div>
          <h1 className="text-5xl mb-5 font-bold uppercase self-end">
            Awesome <span className="text-primaryAccent">Books</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Image
            className="object-contain"
            width={150}
            alt="dataWiz logo"
            src={dataWizLogo}
          ></Image>
          <span>X</span>
          <Image
            className="object-contain"
            width={150}
            alt="dataWiz logo"
            src={awesomeBooksLogo}
          ></Image>
        </div>
      </section>
    </Wrapper>
  );
};

export default awesomeBooks;
