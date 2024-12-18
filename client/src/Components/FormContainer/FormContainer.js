import React, { useEffect, useState } from "react";
import "./FormContainer.css";
import Input from "../Inputs/Inputs";
import HeaderLogo from "../../Assets/HeaderLogo.png";
import Button from "../Buttons/Button";
import { useLocation } from "react-router-dom";

const FormContainer = ({
  FormTaskLabel,
  numberOFInputs,
  arrayOflabels,
  arrayofPlaceholders,
  arrayofTypes,
  arrayOfStates,
  ButtonActivation,
  setNoErrors, // Receive the setNoErrors function
}) => {
  const renderInputs = [];
  const pathname = useLocation().pathname;

  for (let i = 0; i < numberOFInputs; i++) {
    renderInputs.push(
      <Input
        label={arrayOflabels[i]}
        placeholder={arrayofPlaceholders[i]}
        type={arrayofTypes[i]}
        setValue={arrayOfStates[i]}
        key={i}
        setNoErrors={setNoErrors}
      />
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full text-2xl lg:flex lg:justify-center lg:items-center font-semibold">
        {FormTaskLabel}
      </div>
      <div className="flex flex-col mt-6 lg:w-3/12 lg:justify-center">
        <div className="flex flex-col bg-[#eaeaea80] p-4 rounded-md shadow-md shadow-[#00000079] lg:w-5/3">
          {renderInputs}
          <Button label="Continue" ButtonActivation={ButtonActivation} />
          <div className="mt-4 text-xs font-semibold">
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
