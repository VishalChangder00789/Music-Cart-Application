import React, { useState } from "react";
import "./Mobile_Register.css";
import "../../../Mobile.css";
import { nanoid } from "nanoid";

// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_FORM from "../../MobileComponents/_GLOBAL_MOBILE_FORM/_GLOBAL_MOBILE_FORM";

const Mobile_Register = () => {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

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
      />
      <_GLOBAL_MOBILE_FOOTER
        FooterMessage="Musicart | All rights reserved"
        OptionFooter={false}
      />
    </div>
  );
};

export default Mobile_Register;
