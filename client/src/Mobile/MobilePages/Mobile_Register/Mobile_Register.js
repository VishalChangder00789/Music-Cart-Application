import React, { useState } from "react";
import "./Mobile_Register.css";
import "../../../Mobile.css";
import { nanoid } from "nanoid";
import axios from "axios";
import { sendTokenToLocalStorage } from "../../../Controller/localStorageConnection";
import { sendIdsToLocalStorage } from "../../../Controller/localStorageConnection";
// Imports
import { SERVER_REGISTER_ALL_USERS } from "../../../Constants/Server_Path";
import { LOGIN, PRODUCTS } from "../../../Constants/Client_Path";
// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_FORM from "../../MobileComponents/_GLOBAL_MOBILE_FORM/_GLOBAL_MOBILE_FORM";
import { useNavigate } from "react-router-dom";

const Mobile_Register = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Mobile, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const linkPages = () => {
    navigate(LOGIN);
  };

  const handleRegister = async () => {
    if (!Name || !Mobile || !Email || !Password) {
      return;
    }

    await axios
      .post(SERVER_REGISTER_ALL_USERS, {
        name: Name,
        mobile: Mobile,
        email: Email,
        password: Password,
        passwordConfirm: Password,
      })
      .then((response) => {
        let data = response.data;
        let token = data.token;
        let cartId = data.cartId;
        let userId = data.userId;

        console.log(
          `Data is : ${data} \n Token is : ${token} \n CartId : ${cartId} \n UserId : ${userId}`
        );

        sendTokenToLocalStorage(token);
        sendIdsToLocalStorage(userId, cartId);
        navigate(PRODUCTS);
      })
      .catch((err) => {
        console.log(err);
      });
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
        NumberofInputs={4}
        ArrayInputTitles={[
          "Your name",
          "Mobile number",
          "Enter your email or mobile number",
          "Password",
        ]}
        ArrayInputTypes={["text", "number", "email", "password"]}
        ArrayPlaceHolder={["Name", "Phone", "Email", "Password"]}
        ArrayStateChange={[setName, setPhone, setEmail, setPassword]}
        HandleFormControl={handleRegister}
        linkPages={linkPages}
      />
      <_GLOBAL_MOBILE_FOOTER
        FooterMessage="Musicart | All rights reserved"
        OptionFooter={false}
      />
    </div>
  );
};

export default Mobile_Register;
