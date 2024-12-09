import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../../Components/Banner/Banner";
import FormContainer from "../../Components/FormContainer/FormContainer";

const ConfirmPasswordPage = () => {
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState(false); // null means not validated yet

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noErrors, setNoErrors] = useState(false);

  const handleNewPasswordSubmit = async () => {
    let body = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      token: token,
    };

    try {
      const response = await axios.post(
        "https://music-cart-backend-5.onrender.com/api/v1/changepassword",
        body
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getTokenValidity = async () => {
      const decodedToken = decodeURIComponent(token);
      try {
        // Make a request to validate the reset token
        const response = await axios.post(
          `https://music-cart-backend-5.onrender.com/api/v1/resetpassword`,
          { token: decodedToken }
        );

        // If the response is successful, set valid token state
        if (response.status === 200) {
          setIsValidToken(true);
        }
      } catch (error) {
        toast(error);
      }
    };

    getTokenValidity();
  }, [token]);

  if (!isValidToken) {
    return <div className="min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <Banner />
      <div className="min-h-[600px]">
        <FormContainer
          FormTaskLabel="Reset Password"
          numberOFInputs={2}
          arrayOflabels={["New Password", "Confirm your password"]}
          arrayofPlaceholders={["New Password", "Confirm Password"]}
          arrayofTypes={["password", "password"]}
          arrayOfStates={[setNewPassword, setConfirmPassword]}
          ButtonActivation={handleNewPasswordSubmit}
          setNoErrors={setNoErrors} // Pass setNoErrors to FormContainer
        />
      </div>
    </div>
  );
};

export default ConfirmPasswordPage;
