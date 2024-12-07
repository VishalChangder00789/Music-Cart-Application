import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

// AddressDropdown Component
const AddressDropdown = ({
  addresses,
  selectedAddressIndex,
  setSelectedAddressIndex,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle Dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle address selection
  const handleAddressClick = (index) => {
    setSelectedAddressIndex(index);
    setDropdownOpen(false); // Close dropdown after selecting an address
  };

  return (
    <div>
      <div
        onClick={toggleDropdown}
        className="cursor-pointer bg-white p-2 rounded-md flex items-center justify-between"
      >
        <div>
          {selectedAddressIndex === null
            ? "Select Address"
            : `Address: ${selectedAddressIndex + 1}`}
        </div>
        {dropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </div>

      {/* Dropdown for Multiple Addresses */}
      {dropdownOpen && (
        <div className="bg-gray-100 p-4 rounded-md shadow-lg max-h-60 overflow-y-auto mt-2">
          {addresses.map((addr, index) => (
            <div
              key={index}
              onClick={() => handleAddressClick(index)}
              className="cursor-pointer p-4 mb-2 bg-gray-200 rounded-md"
            >
              Address: {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressDropdown;
