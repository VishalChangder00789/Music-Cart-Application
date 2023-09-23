import React from "react";
import "./ProductSuperHeader.css";

// File Imports
import PhoneLogo from "../../Assets/Phone.png";
import { getTokenFromLocalStorage } from "../../Controller/localStorageConnection";
import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "../../Constants/Client_Path";

const ProductSuperHeader = ({
  PhoneNumber,
  MiddleMessage,
  BackgroundColor,
  ContainerHeight,
  ContainerWidth,
  ImageHeight,
  ImageWidth,
}) => {
  // get token from localStoarge
  const token = getTokenFromLocalStorage();

  const navigate = useNavigate();
  return (
    <div
      style={{
        background: `${BackgroundColor}`,
        height: `${ContainerHeight}`,
        width: `${ContainerWidth}`,
      }}
      className="ProductSuperHeaderContainer"
    >
      <div className="PhoneNumberConatainer">
        <img height={ImageHeight} width={ImageWidth} src={PhoneLogo} />
        {PhoneNumber}
      </div>

      <div className="MiddleContent">{MiddleMessage}</div>

      {!token ? (
        <div className="AuthorizationContent">
          <div onClick={() => navigate(LOGIN)}>Login</div>
          <div onClick={() => navigate(REGISTER)}>Register</div>
        </div>
      ) : (
        <div>Logout</div>
      )}
    </div>
  );
};

export default ProductSuperHeader;
