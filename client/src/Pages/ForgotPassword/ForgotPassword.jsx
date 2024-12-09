import React, { useState } from "react";
import Banner from "../../Components/Banner/Banner";
import FormContainer from "../../Components/FormContainer/FormContainer";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [noErrors, setNoErrors] = useState(false);

  const handleFogotPasswordButton = async () => {
    if (!noErrors) {
      toast.error("Please provide valid details");
      return;
    }

    if (!Email) {
      toast.error("Email is required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://music-cart-backend-5.onrender.com/api/v1/forget-password",
        { email: Email }
      );

      if (response.status === 200) {
        toast("Please check your email for a reset password link");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Banner />
      <div className="lg:min-h-[500px] min-h-[700px]">
        <FormContainer
          FormTaskLabel="Forgot Password"
          numberOFInputs={1}
          arrayOflabels={["Enter your email"]}
          arrayofPlaceholders={["Email"]}
          arrayofTypes={["email"]}
          arrayOfStates={[setEmail]}
          ButtonActivation={handleFogotPasswordButton}
          setNoErrors={setNoErrors}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
