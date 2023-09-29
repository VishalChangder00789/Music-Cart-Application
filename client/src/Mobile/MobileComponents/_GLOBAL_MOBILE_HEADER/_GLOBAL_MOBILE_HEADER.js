import React, { useState } from "react";
import "./_GLOBAL_MOBILE_HEADER.css";

// Files
import HeaderLogoImage from "../../../Assets/HeaderLogoMobile.png";
import BackButtonLogoImage from "../../../Assets/BackButtonHeaderLogo.png";
import SearchButtonLogoImage from "../../../Assets/searchbutton.png";
import BannerImageLogo from "../../../Assets/MobileBanner.png";

import { PRODUCTS } from "../../../Constants/Client_Path";
import { useNavigate } from "react-router-dom";

const _GLOBAL_MOBILE_HEADER = ({
  HeaderMessage,
  ButtonActivation,
  SearchActive,
  isBannerActive,
  pageToGo,
  setSearchTerm,
}) => {
  const navigate = useNavigate();
  const handleClickEvent = (pageToGo) => {
    navigate(pageToGo);
  };

  const [localSearchTermControl, setLocalSearchTermControl] = useState("");

  const handleInputChange = (e) => {
    setLocalSearchTermControl(e.target.value);
    setSearchTerm(localSearchTermControl);
  };

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
            <input
              value={localSearchTermControl}
              onChange={(e) => handleInputChange(e)}
              placeholder="Search Musicart"
            />
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
        <div
          onClick={() => handleClickEvent(pageToGo)}
          className="MOBILEHEADER_CONTAINER_Button"
        >
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
