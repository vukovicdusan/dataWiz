import React, { useState } from "react";

type FormState = {
  [key: string]: string;
};

const useInput = () => {
  const [inputValue, setInputValue] = useState<FormState>({});

  const valueHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    /* Extracted input value*/
    const { name, value } = e.target;

    /** Set extracted value state and check for password repeat value */
    setInputValue((prevInputValue) => {
      const updatedValue = {
        ...prevInputValue,
        [name]: value,
      };
      return updatedValue;
    });
  };

  return [inputValue, valueHandler] as const;
};

export default useInput;
