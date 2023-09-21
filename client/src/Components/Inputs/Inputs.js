import React, { useEffect, useState } from "react";
import "./Inputs.css";

const Input = ({
  type,
  placeholder,
  label,
  borderColor,
  width,
  height,
  ContainerHeight,
  ContainerWidth,
  marginTop,
  setValue,
  containerMarginTop,
  borderRadius,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <div
      style={{
        marginTop: `${containerMarginTop}`,
        height: `${ContainerHeight}`,
        width: `${ContainerWidth}`,
      }}
      className="InputContainer"
    >
      {label ? <label className="LabelHolder">{label}</label> : ""}
      <input
        style={{
          border: `2px solid ${borderColor}`,
          width: `${width}`,
          height: `${height}`,
          marginTop: `${marginTop}`,
          borderRadius: `${borderRadius}`,
        }}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        type={type}
        placeholder={placeholder}
        className="Input"
      />
    </div>
  );
};

export default Input;
