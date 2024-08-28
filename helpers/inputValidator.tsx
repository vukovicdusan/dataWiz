export const inputValidator = (
  name: string,
  value: string,
  showError?: boolean
) => {
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let websiteRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  const errorMessages: Record<string, string> = {
    email: "Please provide a valid email.",
    name: "Please provide your name.",
    website: "Please provide the URL of your website.",
  };

  let error = false;
  let message = "";

  switch (name) {
    case "email":
      error = !emailRegex.test(value);
      message = error ? errorMessages[name] : "";
      break;
    case "name":
      error = value.trim() === "";
      message = error ? errorMessages[name] : "";
      break;
    case "website":
      error = !websiteRegex.test(value);
      message = error ? errorMessages[name] : "";
      break;
    default:
      break;
  }

  return {
    [name]: {
      value,
      error,
      message,
      showError,
    },
  };
};
