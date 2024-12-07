// EditProfile.js
import React, { useEffect, useRef, useState } from "react";
import Banner from "../../Components/Banner/Banner";
import { useNavigate } from "react-router-dom";
import { useUserInformation } from "../Profile/contexts/user-information";
import AddressDropdown from "./components/AddressDropdown/AddressDropdown"; // Import the AddressDropdown component
import AddressDetails from "./components/AddressDetail/AddressDetail"; // Import AddressDetails component
import PasswordInput from "./components/PasswordInput/PasswordInput";

import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import DatePicker from "./components/DatePicker/DatePicker";
import DatePickerComponent from "./components/DatePicker/DatePicker";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userInformation } = useUserInformation();

  // Dummy address data
  const [address, setAddress] = useState([
    {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    {
      street: "456 Park Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    {
      street: "789 Oak Dr",
      city: "Chicago",
      state: "IL",
      zipCode: "60007",
      country: "USA",
    },
  ]);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef();

  useEffect(() => {
    // Backend logic goes here (GET, PUT, POST, DELETE)
    // Get all the address of the user,
    // create get for the userid for all the address,
    // create a put or patch method for editing the address of the userId and addressId
    // create a post method to add an Address and associate a userId with it
    // create a method to delete address with addressId of the userId
  }, []);

  const closeDropdown = () => {
    setSelectedAddressIndex(null); // Close the dropdown
  };

  return (
    <div>
      <Banner />
      <div className="lg:flex lg:flex-col lg:w-3/4 bg-white lg:p-2">
        {/* Profile Header */}
        <div className="lg:flex lg:space-x-8">
          {/* Profile Card */}
          <div className="p-6 rounded-md lg:w-1/3">
            <div className="flex items-center mb-6 h-60 justify-center bg-[#a2a2a26e] p-4 ">
              <div className="w-48 h-48 rounded-full bg-[#585858] "></div>
            </div>
            <div className="border p-4 rounded-md bg-[#cececea0] min-h-[400px]">
              <input
                value={userInformation.name || "Name"}
                onClick={() => navigate("/editProfile")}
                className="w-full text-black  p-2 rounded-md pl-2"
              />
              <input
                value={userInformation.email || "Email"}
                onClick={() => navigate("/editProfile")}
                className="mt-4 w-full text-black  p-2 rounded-md pl-2"
              />

              {/* Problematic to work with */}

              {/* <div
                ref={datePickerRef}
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className={`mt-4 w-full text-black bg-white p-2 rounded-md pl-2 flex flex-col justify-between ${
                  isDatePickerOpen ? `h-80` : ""
                }`}
              >
                <DatePickerComponent
                  dateOfBirth={dateOfBirth}
                  setDateOfBirth={setDateOfBirth}
                  isDatePickerOpen={isDatePickerOpen} // Pass visibility state
                  setIsDatePickerOpen={setIsDatePickerOpen} // Pass setter function
                  datePickerRef={datePickerRef}
                />
              </div> */}

              <input
                value={userInformation.phone || "Phone"}
                onClick={() => navigate("/editProfile")}
                className="mt-4 w-full text-black  p-2 rounded-md pl-2"
              />

              <div className="mt-4">
                {/* Use AddressDropdown component */}
                <AddressDropdown
                  addresses={address}
                  selectedAddressIndex={selectedAddressIndex}
                  setSelectedAddressIndex={setSelectedAddressIndex}
                />

                {/* Use AddressDetails component */}
                {selectedAddressIndex !== null && (
                  <AddressDetails
                    address={address[selectedAddressIndex]}
                    selectedAddressIndex={selectedAddressIndex}
                    closeDropdown={closeDropdown} // Pass closeDropdown function
                  />
                )}
              </div>

              <PasswordInput />

              <input
                value={userInformation.location || "Location"}
                className="mt-4 w-full text-black bg-white p-2 rounded-md pl-2"
              />
            </div>
          </div>
        </div>

        {/* Address Dropdown */}
      </div>
    </div>
  );
};

export default EditProfile;
