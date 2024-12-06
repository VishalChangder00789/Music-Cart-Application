import React, { useState } from "react";
import "./Button.css";

const Button = ({
  label,
  background,
  ButtonWidth,
  ButtonHeight,
  textColor,
  borderColor,
  marginTop,
  borderRadius,
  ButtonActivation,
}) => {
  return (
    <button
      onClick={ButtonActivation}
      className="Button"
      style={{
        height: `${ButtonHeight}`,
        width: `${ButtonWidth}`,
        background: `${background}`,
        color: `${textColor}`,
        border: `2px solid ${borderColor}`,
        marginTop: `${marginTop}`,
        borderRadius: `${borderRadius}`,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
