import React from "react";
import "./LinkPages.css";
import Button from "../Buttons/Button";
import Line from "../../Assets/Line.png";

const LinkPages = ({
  label,
  buttonLabel,
  background,
  ContainerHeight,
  ContainerWidth,
  ButtonContainerWidth,
  ButtonContainerHeight,
  ButtonTextColor,
  ButtonWidth,
  ButtonHeight,
  lineHeight,
  lineWidth,
  ButtonBorderColor,
  handleGotoRegister,
}) => {
  return (
    <div
      className="LinkPagesContainerOuter"
      style={{
        minHeight: `${ContainerHeight}`,
        width: `${ContainerWidth}`,
      }}
    >
      <div className="LinkPagesContainer">
        <img height={lineHeight} width={lineWidth} src={Line} />
        {label}
        <img height={lineHeight} width={lineWidth} src={Line} />
      </div>
      <Button
        background={background}
        label={buttonLabel}
        containerWidth={ButtonContainerWidth}
        containerHeight={ButtonContainerHeight}
        textColor={ButtonTextColor}
        ButtonWidth={ButtonWidth}
        ButtonHeight={ButtonHeight}
        borderColor={ButtonBorderColor}
        ButtonActivation={handleGotoRegister}
      />
    </div>
  );
};

export default LinkPages;
