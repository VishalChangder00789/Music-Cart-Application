import React, { useState } from "react";
import "./Mobile_Login.css";
import "../../../Mobile.css";
import { nanoid } from "nanoid";

// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_FORM from "../../MobileComponents/_GLOBAL_MOBILE_FORM/_GLOBAL_MOBILE_FORM";
import _GLOBAL_MOBILE_INPUTS from "../../MobileComponents/_GLOBAL_MOBILE_INPUTS/_GLOBAL_MOBILE_INPUTS";
import FormContainer from "../../../Components/FormContainer/FormContainer";

const Mobile_Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLoginButton = () => {
    console.log("Something");
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
      />

      <_GLOBAL_MOBILE_FOOTER
        FooterMessage="Musicart | All rights reserved"
        OptionFooter={false}
      />
    </div>
  );
};

export default Mobile_Login;
