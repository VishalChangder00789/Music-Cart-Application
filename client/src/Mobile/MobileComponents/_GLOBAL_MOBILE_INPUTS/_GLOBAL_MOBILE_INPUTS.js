import React, { useEffect, useState } from "react";
import "./_GLOBAL_MOBILE_INPUTS.css";

const _GLOBAL_MOBILE_INPUTS = ({
  InputTitle,
  InputType,
  InputPlaceholder,
  setInputChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // const nanoidKey = nanoid();

  useEffect(() => {
    setInputChange(inputValue);
  }, [inputValue]);

  return (
    <div className="_GLOBAL_MOBILE_INPUTS_CONTAINER">
      <div className="_INPUT_LABEL">{InputTitle}</div>
      <input
        placeholder={InputPlaceholder}
        type={InputType}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default _GLOBAL_MOBILE_INPUTS;
