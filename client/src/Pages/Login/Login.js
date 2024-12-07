import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Files
import LinkPages from "../../Components/LinkPages/LinkPages";
import FormContainer from "../../Components/FormContainer/FormContainer";
import LogoHeader from "../../Components/LogoHeader/LogoHeader";
import Footer from "../../Components/Footer/Footer";
import { SERVER_LOGIN } from "../../Constants/Server_Path";
import {
  sendIdsToLocalStorage,
  sendTokenToLocalStorage,
} from "../../Controller/localStorageConnection";
import { PRODUCTS, REGISTER } from "../../Constants/Client_Path";
import Banner from "../../Components/Banner/Banner";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const handleGotoRegister = () => {
    navigate(REGISTER);
  };

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

  return (
    <div>
      <Banner />
      <div className="min-h-[700px] lg:border-2">
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
          ButtonActivation={handleLoginButton}
        />
        <LinkPages
          label="New to Musicart?"
          buttonLabel="Create your Musicart account"
          handleGotoRegister={handleGotoRegister}
        />
      </div>
    </div>
  );
};

export default Login;
