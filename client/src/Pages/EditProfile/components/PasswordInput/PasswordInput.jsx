import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const PasswordInput = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const togglePasswordSection = () => {
    setIsPasswordOpen((prevState) => !prevState);
  };

  const handleCancelButton = () => {
    setIsPasswordOpen(false);
  };

  return (
    <div className="mt-4 w-full text-black bg-white p-2 rounded-md pl-2">
      <div onClick={togglePasswordSection} className="cursor-pointer">
        {isPasswordOpen ? (
          ""
        ) : (
          <div className="flex items-center justify-between">
            <div>Password</div>
            <MdArrowDropDown />
          </div>
        )}
      </div>

      {isPasswordOpen && (
        <div>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 mt-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mt-2 border rounded-md"
          />

          <div className="flex justify-between">
            <button className="w-1/3 p-2 mt-2 border rounded-md bg-blue-500 text-white">
              Save
            </button>
            <button
              onClick={handleCancelButton}
              className="w-1/3 p-2 mt-2 bg-[#e4e3e3] rounded-md border text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
