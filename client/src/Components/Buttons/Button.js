import React, { useState } from "react";
import "./Button.css";

const Button = ({
  label,
  background,
  containerWidth,
  containerHeight,
  ButtonWidth,
  ButtonHeight,
  textColor,
  borderColor,
  marginTop,
  borderRadius,
  ButtonActivation,
}) => {
  return (
    <div
      style={{
        width: `${containerWidth}`,
        height: `${containerHeight}`,
        marginTop: `${marginTop}`,
        borderRadius: `${borderRadius}`,
      }}
      className="ButtonContainer"
    >
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
    </div>
  );
};

export default Button;
