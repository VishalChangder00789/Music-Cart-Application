import React, { useState } from "react";
import "./CheckoutPanel.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const CheckoutPanel = ({
  title,
  Details,
  dropdown = false,
  options = ["1", "2", "3"],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-2 bg-white rounded-sm lg:rounded-md lg:shadow-md">
      <div className="text-sm font-semibold">{title}</div>
      <div
        className="mt-4 border border-[#929292] p-1 text-sm rounded-md flex flex-col"
        onClick={handleOpenDropdown}
      >
        <div className="flex justify-between items-center pl-2">
          {dropdown && selectedOption !== "" ? selectedOption : Details}
          {isDropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </div>
        <div>
          {dropdown && options && isDropdownOpen && options.length > 0
            ? options.map((option) => {
                return (
                  <div
                    className="pl-2 hover:bg-[#37373747]"
                    onClick={() => handleOptionSelection(option)}
                  >
                    {option}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPanel;
