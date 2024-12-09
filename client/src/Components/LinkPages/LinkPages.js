import React from "react";
import "./LinkPages.css";
import Button from "../Buttons/Button";
import Line from "../../Assets/Line.png";

const LinkPages = ({
  label,
  buttonLabel,
  handleGotoRegister,
  handleGotoFogetPassword,
}) => {
  return (
    <div className="p-6 w-full lg:flex lg:flex-col lg:justify-center lg:items-center">
      <div className="lg:justify-center lg:w-3/12 flex flex-col border-t border-gray-200 pt-10">
        <div className="flex justiy-center items-center">
          <Button
            label="Forgot Password ?"
            ButtonActivation={handleGotoFogetPassword}
          />
        </div>
      </div>

      <div className="lg:justify-center lg:w-3/12 flex flex-col pt-2 mt-8">
        <div className="text-sm text-center font-semibold ">{label}</div>
        <div className="flex justiy-center items-center">
          <Button label={buttonLabel} ButtonActivation={handleGotoRegister} />
        </div>
      </div>
    </div>
  );
};

export default LinkPages;
