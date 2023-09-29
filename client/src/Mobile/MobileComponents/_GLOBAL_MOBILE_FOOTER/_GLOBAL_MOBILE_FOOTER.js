import React from "react";
import "./_GLOBAL_MOBILE_FOOTER.css";

// Files
import HomeImage from "../../../Assets/home.png";
import CartImage from "../../../Assets/cart.png";
import ProfileImage from "../../../Assets/profile.png";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../../Constants/Client_Path";

import { BASEURL, LOGIN, VIEWCART } from "../../../Constants/Client_Path";
import { getTokenFromLocalStorage } from "../../../Controller/localStorageConnection";

const _GLOBAL_MOBILE_FOOTER = ({ OptionFooter, FooterMessage }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!getTokenFromLocalStorage()) {
      navigate(LOGIN);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("UserIds");
      navigate(PRODUCTS);
    }
  };

  const handleHomeClick = () => {
    navigate(BASEURL);
  };

  const handleCartClick = () => {
    navigate(VIEWCART);
  };

  return (
    <div
      className={`MOBILEFOOTER_CONTAINER ${OptionFooter ? `Background` : ""}`}
    >
      {!OptionFooter ? (
        <div>{FooterMessage}</div>
      ) : (
        <div className="MOBILEFOOTER_CONTAINER_SHOWOPTIONS">
          <img onClick={handleHomeClick} src={HomeImage} />
          <img onClick={handleCartClick} src={CartImage} />
          <img onClick={handleProfileClick} src={ProfileImage} />
        </div>
      )}
    </div>
  );
};

export default _GLOBAL_MOBILE_FOOTER;
