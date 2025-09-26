import React from "react";
import "./Button.css";

const Button = ({ label, ButtonActivation }) => {
  return (
    <button
      onClick={ButtonActivation}
      className={`p-3 w-full font-bold rounded-sm bg-[#972fff] text-white`}
    >
      {label}
    </button>
  );
};

export default Button;
