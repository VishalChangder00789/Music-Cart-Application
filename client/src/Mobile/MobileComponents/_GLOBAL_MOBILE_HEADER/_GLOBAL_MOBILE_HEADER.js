import React from "react";
import "./_GLOBAL_MOBILE_HEADER.css";

// Files
import HeaderLogoImage from "../../../Assets/HeaderLogoMobile.png";
import BackButtonLogoImage from "../../../Assets/BackButtonHeaderLogo.png";
import SearchButtonLogoImage from "../../../Assets/searchbutton.png";
import BannerImageLogo from "../../../Assets/MobileBanner.png";

const _GLOBAL_MOBILE_HEADER = ({
  HeaderMessage,
  ButtonActivation,
  SearchActive,
  isBannerActive,
}) => {
  return (
    <div className="MOBILEHEADER_CONTAINER">
      <div
        className={
          !SearchActive
            ? `MOBILEHEADER_CONTAINER_IMAGECONTAINER`
            : `MOBILEHEADER_CONTAINER_SEARCHCONTAINER`
        }
      >
        {SearchActive ? (
          <div className="MOBILEHEADER_CONTAINER_SEARCHCONTAINER_ImageContainer">
            <img src={SearchButtonLogoImage} />
            <input placeholder="Search Musicart" />
          </div>
        ) : (
          <img src={HeaderLogoImage} />
        )}
      </div>
      {HeaderMessage ? (
        <div className="MOBILEHEADER_CONTAINER_Header">{HeaderMessage}</div>
      ) : (
        ""
      )}
      {ButtonActivation ? (
        <div className="MOBILEHEADER_CONTAINER_Button">
          <img src={BackButtonLogoImage} />
        </div>
      ) : (
        ""
      )}

      {isBannerActive ? (
        <div className="_MOBILEHEADER_CONTAINER_BANNER_CONTAINER">
          <img src={BannerImageLogo} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default _GLOBAL_MOBILE_HEADER;
