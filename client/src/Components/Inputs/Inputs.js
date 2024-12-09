import React, { useState, useEffect } from "react";
import "./Inputs.css";

const Input = ({ type, placeholder, label, setValue, setNoErrors }) => {
  const [inputValue, setInputValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Validation functions
  const checkEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrorValue("Invalid email format.");
      return false;
    }
    return true;
  };

  const checkPassword = (value) => {
    const passwordRegex =
      /^(?=(.*[A-Za-z]))(?=(.*\d))(?=(.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrorValue(
        "Password must be at least 8 characters long, include one letter, one number, and one special character."
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      setErrorValue(""); // Reset error if input is empty
      setNoErrors(false); // Reset noErrors when input is empty
    } else {
      let isValid = true;
      if (type === "email") {
        isValid = checkEmail(inputValue);
      } else if (type === "password") {
        isValid = checkPassword(inputValue);
      }

      if (isValid) {
        setErrorValue(""); // Clear error if valid
        setNoErrors(true);
      } else {
        setNoErrors(false); // Set noErrors to false if any validation fails
      }
    }

    setValue(inputValue); // Update parent state
  }, [inputValue, type, setValue, setNoErrors]);

  return (
    <div className="w-full m-2">
      {label && <label className="text-xs font-semibold">{label}</label>}
      <input
        value={inputValue}
        onChange={handleInputChange}
        type={type}
        placeholder={placeholder}
        className={`${
          errorValue ? "border border-red-500" : ""
        } w-[95%] mt-1 text-sm rounded-sm p-3 shadow-sm outline-none`}
      />
      {errorValue && <p className="text-red-500 text-xs mt-1">{errorValue}</p>}
    </div>
  );
};

export default Input;
