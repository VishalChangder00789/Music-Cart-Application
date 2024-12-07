import React from "react";
import "./Thankyou.css";
import ProductLogo from "../../Assets/HeaderLogo.png";
import Confetti from "../../Assets/confetti1.png";

import Banner from "../../Components/Banner/Banner";
import { BASEURL, PRODUCTS } from "../../Constants/Client_Path";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Thankyou = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate(BASEURL);
  };

  return (
    <div className="_GLOBAL_MAIN_CONTENT_HOLDER_THANKYOU">
      <div className="ThankyouPageBanner">
        <img src={ProductLogo} />
      </div>

      <div className="ThankyouPageMidContent">
        <div className="ThankyouPageMidContent-Holder">
          <div className="ConfettiHolder">
            <img src={Confetti} />
          </div>
          <div className="ConfettiHolder_InformationHolder">
            <div className="GJ">Order is placed successfully!</div>
            <div className="SJ">
              You will be receiving a confirmation email with order details
            </div>
          </div>

          <div className="BackToHomeButton">
            <button onClick={handleGoToHome}>Go back to Home page</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
