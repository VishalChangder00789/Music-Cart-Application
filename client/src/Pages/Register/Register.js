import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Files Import
import LinkPages from "../../Components/LinkPages/LinkPages";
import FormContainer from "../../Components/FormContainer/FormContainer";
import LogoHeader from "../../Components/LogoHeader/LogoHeader";
import Footer from "../../Components/Footer/Footer";
import { SERVER_REGISTER_ALL_USERS } from "../../Constants/Server_Path";
import {
  sendIdsToLocalStorage,
  sendTokenToLocalStorage,
} from "../../Controller/localStorageConnection";
import { PRODUCTS } from "../../Constants/Client_Path";
import Banner from "../../Components/Banner/Banner";

const Register = () => {
  const [Name, setName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!Name || !Mobile || !Email || !Password) {
      return;
    }

    await axios
      // SERVER_REGISTER_ALL_USERS
      .post("http://localhost:8000/api/v1/_REGISTER", {
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
    <div className="_GLOBAL_PAGE_INNER_HOLDER">
      <Banner />
      <FormContainer
        FormTaskLabel="Create Account"
        width="450px"
        height="520px"
        numberOFInputs={4}
        arrayOflabels={["Your name", "Mobile number", "Email Id", "Password"]}
        arrayofPlaceholders={["Name", "Mobile", "Email", "Password"]}
        arrayofTypes={["text", "number", "email", "password"]}
        inputWidth="97%"
        inputHeight="30px"
        labelContainerHeight="40px"
        ButtoncontainerHeight="40px"
        ButtoncontainerWidth="100%"
        ButtonHeight="100%"
        ButtonWidth="100%"
        ButtonLabel="Continue"
        ButtontextColor="white"
        bottomMessage="By continuing, you agree to Musicart privacy notice and conditions of use."
        PreMessage="By enrolling your mobile phone number, you consent to receive 
        automated security notifications via text message from Musicart. Message and data rates may apply."
        arrayOfStates={[setName, setMobile, setEmail, setPassword]}
        inputMarginTop="0%"
        containerMarginTop="4%"
        ButtonActivation={handleRegister}
      />

      <div className="w-full mt-4 justify-center flex items-center mb-10">
        <div className="text-sm font-semibold flex items-center">
          Already have an account?
        </div>
        <Link
          className="text-blue-700 hover:underline ml-2 text-lg flex items-center"
          to="/login"
        >
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Register;
