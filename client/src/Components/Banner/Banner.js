import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

// Files
import Button from "./../Buttons/Button";
import Filter from "../Filter/Filter";
import { BASEURL } from "../../Constants/Client_Path";
import HeaderLogoImage from "../../Assets/HeaderLogo.png";
import BannerImage from "../../Assets/Banner.png";

const Banner = () => {
  return (
    <div className="BannerContent">
      <div className="LogoHeaderContent">
        <div className="LeftPart">
          <img src={HeaderLogoImage} />
          <Link className="LinkTag" to={BASEURL}>
            Home
          </Link>
        </div>
        <div className="CartButton">
          <Button
            label="View Cart"
            background="#1D7000"
            containerWidth="100%"
            containerHeight="100%"
            ButtonHeight="100%"
            ButtonWidth="100%"
            textColor="white"
            marginTop="0px"
            borderRadius="24px"
          />
        </div>
      </div>
      <div className="BannerContainer">
        <img src={BannerImage} className="BannerImage" />
      </div>

      <Filter />
    </div>
  );
};

export default Banner;
