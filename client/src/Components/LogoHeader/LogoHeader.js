import React from "react";
import "./LogoHeader.css";
import LogoHeaderImage from "../../Assets/HeaderLogo.png";

const LogoHeader = ({
  ContainerHeight,
  ContainerWidth,
  LogoHeight,
  LogoWidth,
}) => {
  return (
    <div
      style={{ height: `${ContainerHeight}`, width: `${ContainerWidth}` }}
      className="LogoHeader"
    >
      <img height={LogoHeight} width={LogoWidth} src={LogoHeaderImage} />
    </div>
  );
};

export default LogoHeader;
