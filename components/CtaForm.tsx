"use client";
import React, { useState } from "react";
import Button from "./Button";

type TContactFormInput = {
  name: string;
  email: string;
  message: string;
};

const CtaForm = () => {
  const [inputValue, setInputValue] = useState<TContactFormInput>({
    name: "",
    email: "",
    message: "",
  });

  function inputHandler(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    e.preventDefault();
    let field = (e.target as HTMLInputElement | HTMLTextAreaElement).name;
    let value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    switch (field) {
      case "name":
        setInputValue({ ...inputValue, name: value });
        break;
      case "email":
        setInputValue({ ...inputValue, email: value });
        break;
      case "message":
        setInputValue({ ...inputValue, message: value });
        break;
      default:
        break;
    }
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(inputValue),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("ctaform response", await response.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6  pt-2">
      <div className="relative flex flex-col w-full">
        <input
          className="max-w-full py-3 px-4 peer rounded-2xl bg-secondaryAccent border border-white"
          type="text"
          name="name"
          id="name"
          autoCapitalize="none"
          autoCorrect="off"
          required
          onChange={inputHandler}
        />
        <label
          className={`absolute text-primaryAccent bg-secondaryAccent left-4 px-2 transition-all duration-200 ease-linear peer-focus:-top-1 peer-focus:text-sm ${
            Object.values(inputValue.name).length === 0
              ? "top-1/2 -translate-y-1/2"
              : "-translate-y-1/2"
          }`}
          htmlFor="name"
        >
          Name
        </label>
      </div>
      <div className="relative flex flex-col w-full">
        <input
          className="max-w-full py-3 px-4 peer rounded-2xl bg-secondaryAccent border border-white"
          type="text"
          name="email"
          id="email"
          autoCapitalize="none"
          autoCorrect="off"
          required
          pattern="[^@]+@[^\.]+\..+"
          onChange={inputHandler}
        />
        <label
          className={`absolute text-primaryAccent bg-secondaryAccent left-4 px-2 transition-all duration-200 ease-linear peer-focus:-top-1 peer-focus:text-sm ${
            Object.values(inputValue.email).length === 0
              ? "top-1/2 -translate-y-1/2"
              : "-translate-y-1/2"
          }`}
          htmlFor="email"
        >
          Email
        </label>
      </div>
      <div className="relative flex flex-col w-full">
        <textarea
          className="max-w-full py-3 px-4 peer rounded-2xl bg-secondaryAccent border border-white"
          name="message"
          id="message"
          autoCapitalize="none"
          autoCorrect="off"
          required
          title="Please leave a message."
          onChange={inputHandler}
        />
        <label
          className={`absolute text-primaryAccent bg-secondaryAccent left-4 px-2 transition-all duration-200 ease-linear peer-focus:text-sm peer-focus:-top-3 ${
            Object.values(inputValue.message).length === 0 ? "top-3" : "-top-3"
          }`}
          htmlFor="message"
        >
          Message
        </label>
      </div>
      <p className="text-green-500 font-bold">
        Thank you for your message! I will get back to you ASAP!
      </p>
      <Button>Get your free audit</Button>
    </form>
  );
};

export default CtaForm;
