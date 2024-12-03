import React, { useState } from "react";
import "./_GLOBAL_MOBILE_HEADER.css";

// Files
import HeaderLogoImage from "../../../Assets/HeaderLogoMobile.png";
import BackButtonLogoImage from "../../../Assets/BackButtonHeaderLogo.png";
import SearchButtonLogoImage from "../../../Assets/searchbutton.png";
import BannerImageLogo from "../../../Assets/MobileBanner.png";

import { PRODUCTS } from "../../../Constants/Client_Path";
import { useLocation, useNavigate } from "react-router-dom";

const _GLOBAL_MOBILE_HEADER = ({
  HeaderMessage,
  ButtonActivation,
  SearchActive,
  isBannerActive,
  pageToGo,
  setSearchTerm,
}) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleClickEvent = (pageToGo) => {
    navigate(pageToGo);
  };

  const [localSearchTermControl, setLocalSearchTermControl] = useState("");

  const handleInputChange = (e) => {
    setLocalSearchTermControl(e.target.value);
    setSearchTerm(localSearchTermControl);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins , sans-serif",
        fontWeight: "500",
        fontStyle: "normal",
      }}
      className=""
    >
      <div className="bg-[#3c1143] p-4 flex items-center justify-between">
        <img src={HeaderLogoImage} alt="Logo" />
        {SearchActive ? (
          <div className="flex border bg-white p-2 w-[150px] rounded-md items-center justify-around">
            <img src={SearchButtonLogoImage} className="h-4 w-4 mb-[1px]" />
            <input
              className="w-5/6 outline-none text-xs mt-[1px] text-[#3c1143]"
              value={localSearchTermControl}
              onChange={(e) => handleInputChange(e)}
              placeholder="Search Musicart"
            />
          </div>
        ) : (
          ""
          // <img src={HeaderLogoImage} />
        )}
      </div>
      {HeaderMessage ? (
        <div className="MOBILEHEADER_CONTAINER_Header">{HeaderMessage}</div>
      ) : (
        ""
      )}
      {/* {ButtonActivation ? (
        <div
          onClick={() => handleClickEvent(pageToGo)}
          className="MOBILEHEADER_CONTAINER_Button"
        >
          <img src={BackButtonLogoImage} />
        </div>
      ) : (
        ""
      )} */}

      {pathname === "/" && <div>Categories</div>}

      {/* {isBannerActive ? (
        <div className="_MOBILEHEADER_CONTAINER_BANNER_CONTAINER">
          <img src={BannerImageLogo} />
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default _GLOBAL_MOBILE_HEADER;
