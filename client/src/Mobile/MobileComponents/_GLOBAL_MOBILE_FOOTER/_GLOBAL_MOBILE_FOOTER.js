import React from "react";
import "./_GLOBAL_MOBILE_FOOTER.css";

// Files
import HomeImage from "../../../Assets/home.png";
import CartImage from "../../../Assets/cart.png";
import ProfileImage from "../../../Assets/profile.png";

const _GLOBAL_MOBILE_FOOTER = ({ OptionFooter, FooterMessage }) => {
  return (
    <div
      className={`MOBILEFOOTER_CONTAINER ${OptionFooter ? `Background` : ""}`}
    >
      {!OptionFooter ? (
        <div>{FooterMessage}</div>
      ) : (
        <div className="MOBILEFOOTER_CONTAINER_SHOWOPTIONS">
          <img src={HomeImage} />
          <img src={CartImage} />
          <img src={ProfileImage} />
        </div>
      )}
    </div>
  );
};

export default _GLOBAL_MOBILE_FOOTER;
