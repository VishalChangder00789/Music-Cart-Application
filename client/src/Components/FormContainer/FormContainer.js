import React from "react";
import "./FormContainer.css";
import Input from "../Inputs/Inputs";
import HeaderLogo from "../../Assets/HeaderLogo.png";
import Button from "../Buttons/Button";

const FormContainer = ({
  FormTaskLabel,
  width,
  height,
  MainContainerMarginTop,
  numberOFInputs,
  arrayOflabels,
  arrayofPlaceholders,
  arrayofTypes,
  inputWidth,
  inputHeight,
  inputMarginTop,
  labelContainerHeight,
  ButtoncontainerHeight,
  ButtoncontainerWidth,
  ButtonHeight,
  ButtonWidth,
  ButtonLabel,
  ButtontextColor,
  PreMessage,
  bottomMessage,
  arrayOfStates,
  containerMarginTop,
  ButtonActivation,
}) => {
  const renderInputs = [];
  for (let i = 0; i < numberOFInputs; i++) {
    renderInputs.push(
      <Input
        label={arrayOflabels[i]}
        placeholder={arrayofPlaceholders[i]}
        type={arrayofTypes[i]}
        setValue={arrayOfStates[i]}
      />
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full text-2xl lg:flex lg:justify-center lg:items-center font-semibold">
        {FormTaskLabel}
      </div>
      <div className="flex flex-col mt-6 lg:w-3/12 lg:justify-center">
        <div className="flex flex-col bg-[#eaeaea80] p-4 rounded-md shadow-md shadow-[#00000079] lg:w-5/3">
          {renderInputs}
          {PreMessage ? (
            <div className="mt-2 pl-2 text-xs font-semibold">{PreMessage}</div>
          ) : (
            ""
          )}
          <Button label={ButtonLabel} ButtonActivation={ButtonActivation} />
          <div className="mt-4 text-xs font-semibold">{bottomMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
