import React, { useEffect, useState } from "react";
import "./Login.css";

import LinkPages from "../../Components/LinkPages/LinkPages";
import FormContainer from "../../Components/FormContainer/FormContainer";
import LogoHeader from "../../Components/LogoHeader/LogoHeader";
import Footer from "../../Components/Footer/Footer";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    // When Inputs will change this will run
  }, [Email, Password]);

  return (
    <div className="_GLOBAL_PAGE_INNER_HOLDER">
      <LogoHeader
        ContainerHeight="100px"
        ContainerWidth="100%"
        LogoHeight="40%"
        LogoWidth="10%"
      />
      <FormContainer
        FormTaskLabel="SignIn"
        width="450px"
        height="400px"
        MainContainerMarginTop="1%"
        numberOFInputs={2}
        arrayOflabels={["Enter your email or mobile number", "Password"]}
        arrayofPlaceholders={["Email", "Password"]}
        arrayofTypes={["email", "password"]}
        inputMarginTop="5%"
        inputWidth="97%"
        inputHeight="40px"
        labelContainerHeight="40px"
        ButtoncontainerHeight="50px"
        ButtoncontainerWidth="100%"
        ButtonHeight="100%"
        ButtonWidth="100%"
        ButtonLabel="Continue"
        ButtontextColor="white"
        bottomMessage="By continuing, you agree to Musicart privacy notice and conditions of use."
        arrayOfStates={[setEmail, setPassword]}
        containerMarginTop="4%"
      />
      <LinkPages
        label="New to Musicart?"
        buttonLabel="Create your Musicart account"
        background="none"
        ContainerHeight="5px"
        ContainerWidth="450px"
        ButtonContainerWidth="100%"
        ButtonContainerHeight="50px"
        ButtonTextColor="black"
        ButtonHeight="100%"
        ButtonWidth="100%"
        lineHeight="10%"
        lineWidth="30%"
        ButtonBorderColor="
        #BDBDBD"
      />
      <Footer
        ContainerHeight="40px"
        ContainerWidth="100%"
        FooterMessage="Musicart | All rights reserved"
        FooterBackground="
        #2E0052"
      />
    </div>
  );
};

export default Login;
