import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [noErrors, setNoErrors] = useState(true);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!noErrors) {
      console.log("Please fix the errors before submitting.");
      return;
    }

    if (!Name || !Mobile || !Email || !Password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(SERVER_REGISTER_ALL_USERS, {
        name: Name,
        mobile: Mobile,
        email: Email,
        password: Password,
        passwordConfirm: Password,
      });

      const { token, cartId, userId, userSettingId } = response.data;

      sendTokenToLocalStorage(token);
      sendIdsToLocalStorage(userId, cartId, userSettingId);

      navigate(PRODUCTS);
    } catch (err) {
      const errorMessage = err.response.data.message || "An error occurred.";
      setError(errorMessage);
      toast(errorMessage);
    }
  };

  // Disable button if the form is incomplete
  const isFormValid = Name && Mobile && Email && Password;

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
        ButtonDisabled={!isFormValid} // Disable button if the form is incomplete
        setNoErrors={setNoErrors}
      />

      {/* Error Message */}
      {Error && (
        <div className="text-red-500 text-center mt-2">
          <p>{Error}</p>
        </div>
      )}

      <div className="w-full mt-4 justify-center flex items-center mb-10">
        <div className="text-sm font-semibold flex items-center">
          Already have an account?
        </div>
        <Link
          className="text-blue-700 hover:underline ml-2 text-lg flex items-center"
          to="/login"
          aria-disabled={!noErrors ? false : true}
        >
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Register;
