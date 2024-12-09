import React, { useEffect, useState } from "react";
import { useUserInformation } from "./contexts/user-information";
import Banner from "../../Components/Banner/Banner";
import axios from "axios";

// Icons
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi"; // Added icon for mobile menu
import ProfileOptionButton from "./components/ProfileOptionButton/ProfileOptionButton";
import { IoLocationSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { HiMiniLanguage } from "react-icons/hi2";
import { MdDocumentScanner } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Switch from "./components/Switch/Switch";
import { MdDarkMode } from "react-icons/md";
import { getIdsFromLocalStorage } from "../../Controller/localStorageConnection";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userInformation, setUserInformation } = useUserInformation();
  const [userpicture, setUserPicture] = useState("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const userId = JSON.parse(getIdsFromLocalStorage()).userId;
        const response = await axios.get(
          `https://music-cart-backend-5.onrender.com/api/v1/_USERS/${userId}`
        );
        const userPicture =
          `http://localhost:8000/${response.data.data.photo}` ||
          `https://music-cart-backend-5.onrender.com/${response.data.data.photo}`;
        setUserPicture(userPicture);
        setUserInformation(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user information:", error.message);
      }
    };

    getUserInformation();
  }, []);

  if (!userInformation) {
    return <div>Loading...</div>; // Or a better-designed loading component
  }

  return (
    <div>
      <Banner />
      <div className="min-h-[700px] p-4 lg:p-8 lg:flex lg:justify-between lg:gap-8 bg-[#c5c5c559]">
        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <MdOutlineKeyboardArrowLeft
            className="w-[30px] ml-2"
            size={30}
            onClick={() => navigate("/")}
          />

          <HiOutlineMenu
            size={30}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-100 p-4 space-y-4 shadow-md mb-2">
            <ProfileOptionButton name="My dashboard" route="/dashboard" />
            <ProfileOptionButton name="Accounts" route="/accounts" />
            <Switch name="Night Mode" />
            <ProfileOptionButton name="Mobile" route="/mobile" />
            <ProfileOptionButton name="Payments" route="/payments" />
            <ProfileOptionButton name="Complaints" route="/complaints" />
            <ProfileOptionButton name="Supports" route="/supports" />
            <ProfileOptionButton name="Logout" />
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-1/4 lg:space-y-6">
          <ProfileOptionButton name="My dashboard" route="/dashboard" />
          <ProfileOptionButton name="Accounts" route="/accounts" />
          <Switch name="Night Mode" />
          <ProfileOptionButton name="Mobile" route="/mobile" />
          <ProfileOptionButton name="Payments" route="/payments" />
          <ProfileOptionButton name="Complaints" route="/complaints" />
          <ProfileOptionButton name="Supports" route="/supports" />
          <ProfileOptionButton name="Logout" />
        </div>

        {/* Main Content */}
        <div className="lg:flex lg:flex-col lg:w-3/4 bg-white lg:p-2">
          {/* Profile Header */}
          <div className="lg:flex lg:space-x-8 ">
            <div className="p-6 shadow-md rounded-md lg:w-2/3 border">
              <div className="flex flex-col items-center mb-6 w-full p-1">
                <img
                  className="rounded-full w-40 object-cover"
                  src={userpicture}
                  alt="profilepic"
                />

                {/* Profile Information */}
                <div className="flex flex-col mt-4  w-full justify-center items-center h-full">
                  <div className="font-bold text-lg">
                    {userInformation.name}
                  </div>
                  <div className="text-xs text-wrap text-[#7f7f7f]">
                    {userInformation.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/editProfile")}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
              >
                Edit Profile
              </button>
            </div>
            {/* Account Details */}
            <div className="p-6 border shadow-md rounded-md lg:w-1/3 bg-white">
              <h3 className="font-bold text-lg mb-4">My xPay Accounts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active account</span>
                  <button className="bg-red-500 text-white py-1 px-3 rounded">
                    Block Account
                  </button>
                </div>
                <div className="flex justify-between items-center bg-white">
                  <span>Blocked account</span>
                  <button className="bg-green-500 text-white py-1 px-3 rounded">
                    Unblock Account
                  </button>
                </div>
              </div>
            </div>
            {/* My Bills */}
            <div className="p-6 border shadow-md rounded-md lg:w-1/3">
              <h3 className="font-bold text-lg mb-4">My Bills</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Phone bill</span>
                  <span className="text-green-500 font-bold">Paid</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Internet bill</span>
                  <span className="text-red-500 font-bold">Not Paid</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>House rent</span>
                  <span className="text-green-500 font-bold">Paid</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Income tax</span>
                  <span className="text-green-500 font-bold">Paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
