import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LinkPages from "../../Components/LinkPages/LinkPages";
import FormContainer from "../../Components/FormContainer/FormContainer";
import Banner from "../../Components/Banner/Banner";
import { SERVER_LOGIN } from "../../Constants/Server_Path";
import {
  sendIdsToLocalStorage,
  sendTokenToLocalStorage,
} from "../../Controller/localStorageConnection";
import {
  PRODUCTS,
  REGISTER,
  FORGOT_PASSWORD,
} from "../../Constants/Client_Path";
import { toast } from "react-toastify";
import Button from "../../Components/Buttons/Button";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [noErrors, setNoErrors] = useState(false);
  const navigate = useNavigate();

  const handleGotoRegister = () => {
    navigate(REGISTER);
  };

  const handleGotoForgotPassword = () => {
    navigate("/forget-password"); // Navigate to forgot password page
  };

  const handleLoginButton = async () => {
    if (!noErrors) {
      toast(`Please fix the errors before submitting.`);
      console.log("Please fix the errors before submitting.");
      return;
    }

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
        const errorMessage = err.response.data.message;
        toast(errorMessage);
      });
  };

  return (
    <div>
      <Banner />
      <div className="min-h-[700px]">
        <FormContainer
          FormTaskLabel="SignIn"
          numberOFInputs={2}
          arrayOflabels={["Enter your email or mobile number", "Password"]}
          arrayofPlaceholders={["Email", "Password"]}
          arrayofTypes={["email", "password"]}
          arrayOfStates={[setEmail, setPassword]}
          ButtonActivation={handleLoginButton}
          setNoErrors={setNoErrors} // Pass setNoErrors to FormContainer
        />

        <LinkPages
          label="New to Musicart?"
          buttonLabel="Create your Musicart account"
          handleGotoRegister={handleGotoRegister}
          handleGotoFogetPassword={handleGotoForgotPassword}
        />
      </div>
    </div>
  );
};

export default Login;
