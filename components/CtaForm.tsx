"use client";
import React, { useState } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import useInput from "@/hooks/useInput";

type TResponseState = {
  message: string;
  success: boolean;
};

type CtaContentPropType = {
  id: string;
  title: string;
  subtitle: string;
  list: string[];
  ctaButton: string;
};

const CtaForm = (props: CtaContentPropType) => {
  const [inputValue, valueHandler, showErrorHandler, checkAll] = useInput();
  const [loading, setLoading] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<boolean>(false);

  const [responseState, setResponseState] = useState<TResponseState>({
    message: "initial_state",
    success: false,
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let anyErrors =
      inputValue.name.error || inputValue.email.error || inputValue.email.error;
    if (anyErrors) {
      checkAll();
    } else {
      if (honeypot) {
        return;
      }
      try {
        setLoading(true);
        const response = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify(inputValue),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setResponseState(await response.json());
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  function inputChecker(fieldName: string) {
    if (inputValue[fieldName])
      return Object.values(inputValue[fieldName]).length === 0;
    else return true;
  }

  return (
    <form
      id={props.id}
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-6 p-2"
    >
      <div className="relative flex flex-col w-full">
        <input
          className={`max-w-[99%] py-3 px-4 peer rounded-2xl bg-secondaryAccent border ${
            inputValue.name?.showError && inputValue.name?.error
              ? "border-red-600"
              : "border-white"
          }`}
          type="text"
          name="name"
          id="name"
          autoCapitalize="none"
          autoCorrect="off"
          // required
          onChange={(e) => valueHandler(e)}
          onBlur={showErrorHandler}
        />
        <label
          className={`absolute text-primaryAccent bg-secondaryAccent left-4 px-2 transition-all duration-200 ease-linear peer-focus:-top-1 peer-focus:text-sm ${
            inputChecker("name") ? "top-1/2 -translate-y-4" : "-translate-y-1/2"
          }`}
          htmlFor="name"
        >
          Name
        </label>
        <span className="text-red-600 text-sm h-2 pl-2">
          {inputValue.name?.showError ? inputValue.name.message : ""}
          {/* {showError.name ? showErrorParser("name") : ""} */}
        </span>
      </div>
      <div className="relative flex flex-col w-full">
        <input
          className={`max-w-[99%] py-3 px-4 peer rounded-2xl bg-secondaryAccent border ${
            inputValue.email?.showError && inputValue.email?.error
              ? "border-red-600"
              : "border-white"
          }`}
          type="text"
          name="email"
          id="email"
          autoCapitalize="none"
          autoCorrect="off"
          // required
          // pattern="[^@]+@[^\.]+\..+"
          onChange={(e) => valueHandler(e)}
          onBlur={showErrorHandler}
        />
        <label
          className={`absolute text-primaryAccent bg-secondaryAccent left-4 px-2 transition-all duration-200 ease-linear peer-focus:-top-1 peer-focus:text-sm ${
            inputChecker("email")
              ? "top-1/2 -translate-y-4"
              : "-translate-y-1/2"
          }`}
          htmlFor="email"
        >
          Email
        </label>
        <span className="text-red-600 text-sm h-2 pl-2">
          {inputValue.email?.showError ? inputValue.email.message : ""}
          {/* {showError.email ? showErrorParser("email") : ""} */}
        </span>
      </div>
      <div className="relative flex flex-col w-full">
        <input
          className={`max-w-[99%] py-3 px-4 peer rounded-2xl bg-secondaryAccent border ${
            inputValue.website?.showError && inputValue.website?.error
              ? "border-red-600"
              : "border-white"
          }`}
          type="text"
          name="website"
          id="website"
          autoCapitalize="none"
          autoCorrect="off"
          onChange={(e) => valueHandler(e)}
          onBlur={showErrorHandler}
        />
        <label
          className={`absolute text-primaryAccent bg-secondaryAccent left-4 px-2 transition-all duration-200 ease-linear peer-focus:-top-1 peer-focus:text-sm ${
            inputChecker("website")
              ? "top-1/2 -translate-y-4"
              : "-translate-y-1/2"
          }`}
          htmlFor="website"
        >
          Company Website
        </label>
        <span className="text-red-600 text-sm h-2 pl-2">
          {inputValue.website?.showError ? inputValue.website.message : ""}
          {/* {inputValue.website ? inputValue.website.message : ""} */}
        </span>
      </div>
      <div className="relative flex flex-col w-full">
        <textarea
          className="max-w-[99%] py-3 px-4 peer rounded-2xl bg-secondaryAccent border"
          name="message"
          id="message"
          autoCapitalize="none"
          autoCorrect="off"
          title="Leave a message if you want."
          onChange={(e) => valueHandler(e)}
        />
        <label
          className={`absolute text-primaryAccent bg-secondaryAccent left-4 px-2 transition-all duration-200 ease-linear peer-focus:text-sm peer-focus:-top-3 ${
            // inputValue.message && Object.values(inputValue.message).length === 0
            inputChecker("message") ? "top-3" : "-top-3"
          }`}
          htmlFor="message"
        >
          Message (optional)
        </label>
      </div>
      <input
        onChange={() => setHoneypot(true)}
        type="text"
        className="hidden"
        name="honeypot"
      />
      {responseState.message !== "initial_state" ? (
        <p
          className={`font-bold ${
            responseState.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {responseState.message}
        </p>
      ) : null}
      <div className="flex gap-2 items-center">
        <Button id={`${props.id}-button`}>{props.ctaButton}</Button>
        {loading ? <Spinner></Spinner> : null}
      </div>
    </form>
  );
};

export default CtaForm;
