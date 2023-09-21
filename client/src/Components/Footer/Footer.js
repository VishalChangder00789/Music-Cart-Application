import React from "react";
import "./Footer.css";

const Footer = ({
  ContainerHeight,
  ContainerWidth,
  FooterMessage,
  FooterBackground,
}) => {
  return (
    <div
      style={{
        height: `${ContainerHeight}`,
        width: `${ContainerWidth}`,
        background: `${FooterBackground}`,
      }}
      className="FooterContainer"
    >
      {FooterMessage}
    </div>
  );
};

export default Footer;
