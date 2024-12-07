import React, { useState } from "react";
import "./Button.css";

const Button = ({ label, ButtonActivation }) => {
  return (
    <button
      onClick={ButtonActivation}
      className="mt-4 border p-3 w-full bg-[#972fff] text-white font-bold rounded-sm"
    >
      {label}
    </button>
  );
};

export default Button;
