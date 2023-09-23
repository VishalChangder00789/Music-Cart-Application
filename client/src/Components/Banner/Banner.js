import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Files
import Button from "./../Buttons/Button";
import { BASEURL } from "../../Constants/Client_Path";
import HeaderLogoImage from "../../Assets/HeaderLogo.png";
import BannerImage from "../../Assets/Banner.png";
import ViewCartButton from "../ViewCartButton/ViewCartButton";

const Banner = ({
  showAdBanner,
  productPath,
  showClassifiedButton,
  navigationRoute,

  BannerContainerWidth,
  LogoContainerWidth,
  LogoContainerHeight,

  LogoWidth,
  LogoHeigth,
}) => {
  const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate(navigationRoute);
  };

  return (
    <div style={{ width: `${BannerContainerWidth}` }} className="BannerContent">
      <div className="LogoHeaderContent">
        <div
          style={{
            height: `${LogoContainerHeight}`,
            width: `${LogoContainerWidth}`,
          }}
          className="LeftPart"
        >
          <img width={LogoWidth} height={LogoHeigth} src={HeaderLogoImage} />
          <Link className="LinkTag" to={BASEURL}>
            Home {productPath ? `/${productPath}` : ""}
          </Link>
        </div>
        <ViewCartButton
          label="View Cart"
          background="#1D7000"
          containerWidth="10%"
          containerHeight="100%"
          ButtonHeight="100%"
          ButtonWidth="100%"
          textColor="white"
          marginTop="0px"
          borderRadius="24px"
        />
      </div>
      {showClassifiedButton ? (
        <div className="ClassifiedButtonContainer">
          <button onClick={handleNavigateToProducts}>Back to products</button>
        </div>
      ) : (
        ""
      )}
      {showAdBanner ? (
        <div className="BannerContainer">
          <img src={BannerImage} className="BannerImage" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Banner;
