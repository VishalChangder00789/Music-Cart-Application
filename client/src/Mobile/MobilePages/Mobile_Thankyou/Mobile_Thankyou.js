import React from "react";
import "./Mobile_Thankyou.css";

import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import confetti from "../../../Assets/confetti1.png";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../../Constants/Client_Path";

const Mobile_Thankyou = () => {
  const navigate = useNavigate();

  const handleHomePageClick = () => {
    navigate(BASEURL);
  };

  return (
    <div className="_GLOBAL_MOBILE_HOLDER_ADJUSTED">
      <_GLOBAL_MOBILE_HEADER />
      <div className="Mobile_ThankyouContainer">
        <div className="Mobile_ThankyouContainer_Holder">
          <img src={confetti} />

          <div className="_ThankyouHeading">Order is placed successfully!</div>
          <div className="_ThankyouHeading_Sub">
            You will be receiving a confirmation email with order details
          </div>
          <button
            onClick={handleHomePageClick}
            className="_ThankyouHeading_Button"
          >
            Go back to Home page
          </button>
        </div>
      </div>
      <_GLOBAL_MOBILE_FOOTER OptionFooter={true} />
    </div>
  );
};

export default Mobile_Thankyou;
