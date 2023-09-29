import React, { useState } from "react";
import "./Mobile_Login.css";
import "../../../Mobile.css";
import { nanoid } from "nanoid";
import axios from "axios";
import { SERVER_LOGIN } from "../../../Constants/Server_Path";
import { sendTokenToLocalStorage } from "../../../Controller/localStorageConnection";
import { sendIdsToLocalStorage } from "../../../Controller/localStorageConnection";
import { PRODUCTS, REGISTER } from "../../../Constants/Client_Path";

// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_FORM from "../../MobileComponents/_GLOBAL_MOBILE_FORM/_GLOBAL_MOBILE_FORM";
import _GLOBAL_MOBILE_INPUTS from "../../MobileComponents/_GLOBAL_MOBILE_INPUTS/_GLOBAL_MOBILE_INPUTS";
import FormContainer from "../../../Components/FormContainer/FormContainer";
import { useNavigate } from "react-router-dom";

const Mobile_Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginButton = async () => {
    if (!Email || !Password) {
      return;
    }

    await axios
      .post(SERVER_LOGIN, {
        email: Email,
        password: Password,
      })
      .then((response) => {
        let data = response.data.data;
        let token = response.data.token;
        let cartId = data.cartId;
        let userId = data.userId;

        sendTokenToLocalStorage(token);
        sendIdsToLocalStorage(userId, cartId);
        navigate(PRODUCTS);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleLinkPages = () => {
    navigate(REGISTER);
  };

  return (
    <div className="_GLOBAL_MOBILE_PAGE_HOLDER">
      <_GLOBAL_MOBILE_HEADER
        HeaderMessage="WELCOME"
        //SearchActive={true}
        // ButtonActivation={true}
      />
      <_GLOBAL_MOBILE_FORM
        MainTaskMessage="Sign in."
        SubTaskMessage="Already a customer?"
        NumberofInputs={2}
        ArrayInputTitles={["Enter your email or mobile number", "Password"]}
        ArrayInputTypes={["email", "password"]}
        ArrayPlaceHolder={["Email", "Password"]}
        ArrayStateChange={[setEmail, setPassword]}
        HandleFormControl={handleLoginButton}
        linkPages={handleLinkPages}
        passedTitle="New to Music Cart ?"
      />

      <_GLOBAL_MOBILE_FOOTER
        FooterMessage="Musicart | All rights reserved"
        OptionFooter={false}
      />
    </div>
  );
};

export default Mobile_Login;
