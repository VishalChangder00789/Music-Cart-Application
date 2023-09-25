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
        width={inputWidth}
        height={inputHeight}
        placeholder={arrayofPlaceholders[i]}
        type={arrayofTypes[i]}
        marginTop={inputMarginTop}
        setValue={arrayOfStates[i]}
        containerMarginTop={containerMarginTop}
      />
    );
  }

  return (
    <div
      className="FormContainer_Container"
      style={{
        width: `${width}`,
        minHeight: `${height}`,
        marginTop: `${MainContainerMarginTop}`,
      }}
    >
      <div
        className="LabelContainer"
        style={{
          height: `${labelContainerHeight}`,
        }}
      >
        {FormTaskLabel}
      </div>
      <div className="FormBody">
        {renderInputs}
        {PreMessage ? <div className="BottomMessage">{PreMessage}</div> : ""}
        <Button
          label={ButtonLabel}
          containerHeight={ButtoncontainerHeight}
          containerWidth={ButtoncontainerWidth}
          ButtonHeight={ButtonHeight}
          ButtonWidth={ButtonWidth}
          textColor={ButtontextColor}
          background="#2E0052"
          ButtonActivation={ButtonActivation}
        />
        <div className="BottomMessage">{bottomMessage}</div>
      </div>
    </div>
  );
};

export default FormContainer;
