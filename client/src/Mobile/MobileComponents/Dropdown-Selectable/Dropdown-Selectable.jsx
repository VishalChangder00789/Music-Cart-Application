import React, { useContext, useState } from "react";
import {
  DropdownOptionsContext,
  useDropdownOptions,
} from "./context/DropdownOptionsContext/DropdownOptionsContext";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

// Rename the prop destructuring
const DropdownSelectable = ({
  options = ["1", "2", "3"],
  setOptionSelected,
  message = "Choose Address",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownControl = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onOptionClick = (option) => {
    // setOptionSelected(option);
    setIsDropdownOpen(false);
    setSelectedOption(option);
  };
  return (
    <div className="border p-2 bg-[#f6f6f6] rounded-sm min-h-10 border-black">
      <div
        onClick={handleDropdownControl}
        className="flex items-center justify-between"
      >
        <div>{selectedOption === "" ? message : selectedOption}</div>
        {isDropdownOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
      </div>
      {isDropdownOpen &&
        options &&
        options.length > 0 &&
        options.map((option) => {
          return (
            <div
              onClick={() => onOptionClick(option)}
              className="hover:bg-white h-10 mt-2"
            >
              {option}
            </div>
          );
        })}
    </div>
  );
};

export default DropdownSelectable;
