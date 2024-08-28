import { inputValidator } from "@/helpers/inputValidator";
import React, { useState } from "react";

type FormState = {
  [key: string]: {
    value: string;
    error: boolean;
    message: string;
    showError?: boolean;
  };
};

const useInput = () => {
  const [inputValue, setInputValue] = useState<FormState>({
    name: { error: true, message: "", value: "" },
    email: { error: true, message: "", value: "" },
    website: { error: true, message: "", value: "" },
  });

  const valueHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      ...inputValidator(name, value),
    }));
  };

  const showErrorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      ...inputValidator(name, value),
    }));
    let field = name;
    setInputValue((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        showError:
          inputValue.field?.error || inputValue.field?.error === undefined
            ? true
            : false,
      },
    }));
  };

  const checkAll = () => {
    inputValue.name.error;
    setInputValue((prev) => ({
      ...prev,
      name: { ...prev.name, showError: true },
      email: { ...prev.email, showError: true },
      website: { ...prev.website, showError: true },
    }));
  };

  return [inputValue, valueHandler, showErrorHandler, checkAll] as const;
};

export default useInput;
