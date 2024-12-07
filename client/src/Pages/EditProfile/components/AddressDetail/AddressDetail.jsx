// AddressDetails.js
import React from "react";
import "./AddressDetail.css";
import { IoIosCloseCircle } from "react-icons/io";

const AddressDetails = ({ address, selectedAddressIndex, closeDropdown }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-md mt-4 relative glass-effect">
      <div className="font-semibold text-xl mb-4">
        Address: {selectedAddressIndex + 1}
      </div>

      {/* Close Button */}
      <button
        onClick={() => closeDropdown()}
        className="absolute top-2 right-2 text-xl"
      >
        <IoIosCloseCircle size={25} color="#972fff" />
      </button>

      <div className="space-y-4">
        {Object.keys(address).map((key, index) => (
          <div key={index}>
            <label className="block text-sm text-gray-600">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              value={address[key]}
              className="w-full text-black border border-black p-2 rounded-md"
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressDetails;
