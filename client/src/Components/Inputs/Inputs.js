import React, { useEffect, useState } from "react";
import "./Inputs.css";

const Input = ({ type, placeholder, label, setValue }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <div style={{}} className="w-full m-2">
      {label ? <label className="text-xs font-semibold">{label}</label> : ""}
      <input
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        type={type}
        placeholder={placeholder}
        className="w-[95%] mt-1 text-sm rounded-sm p-3 shadow-sm"
      />
    </div>
  );
};

export default Input;
