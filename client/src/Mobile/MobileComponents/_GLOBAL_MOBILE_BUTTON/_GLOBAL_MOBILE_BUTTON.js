import React from "react";
import "./_GLOBAL_MOBILE_BUTTON.css";

const _GLOBAL_MOBILE_BUTTON = ({
  buttonTitle,
  buttonHeight,
  buttonWidth,
  background,
  fontColor,
  fontSize,
  outline,
  borderRadius,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  border,
  fontWeight,
}) => {
  return (
    <button
      style={{
        height: `${buttonHeight}`,
        width: `${buttonWidth}`,
        background: `${background}`,
        color: `${fontColor}`,
        outline: `${outline}`,
        borderRadius: `${borderRadius}`,
        fontSize: `${fontSize}`,
        marginTop: `${marginTop}`,
        marginBottom: `${marginBottom}`,
        marginLeft: `${marginLeft}`,
        marginRight: `${marginRight}`,
        border: `${border}`,
        fontWeight: `${fontWeight}`,
      }}
    >
      {buttonTitle}
    </button>
  );
};

export default _GLOBAL_MOBILE_BUTTON;
