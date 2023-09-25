import React, { useState } from "react";
import "./ViewCartButton.css";
import { LOGIN, VIEWCART } from "../../Constants/Client_Path";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../Controller/localStorageConnection";

const ViewCartButton = ({
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
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (!getTokenFromLocalStorage()) {
      navigate(LOGIN);
    } else {
      navigate(path);
    }
  };

  return (
    <div
      style={{
        width: `${containerWidth}`,
        height: `${containerHeight}`,
        marginTop: `${marginTop}`,
        borderRadius: `${borderRadius}`,
      }}
      className="ViewCartButtonContainer"
    >
      <button
        onClick={() => handleNavigation(VIEWCART)}
        className="ViewCartButton"
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

export default ViewCartButton;
