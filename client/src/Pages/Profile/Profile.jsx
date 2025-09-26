import React, { useContext, useEffect, useState } from "react";
import { useUserInformation } from "./contexts/user-information";
import Banner from "../../Components/Banner/Banner";
import axios from "axios";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
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
import { ModalContext } from "../../CommonComponents/Modal/contexts/ModalContext";
import Modal from "../../CommonComponents/Modal/Modal";
import DeleteAccountModal from "./components/DeleteAccountModal/DeleteAccountModal";
import { useNightModeContext } from "../../Contexts/OtherCommonContext/NightModeContext";

const Profile = () => {
  const { userInformation, setUserInformation } = useUserInformation();
  const { setModalContextComponent, setIsModalOpen, isModalOpen } =
    useContext(ModalContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [userpicture, setUserPicture] = useState("");

  const { isNightMode, toggleNightMode, setIsNightMode } =
    useNightModeContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const userId = JSON.parse(getIdsFromLocalStorage()).userId;
        const response = await axios.get(
          `https://music-cart-backend-5.onrender.com/api/v1/_USERS/${userId}`
        );
        const fetchedUser = response.data.data;
        setUserPicture(fetchedUser.photo);
        setUserInformation(response.data.data);

        const response2 = await axios.get(
          `http://localhost:8000/api/v1/get-user-settings/${
            JSON.parse(localStorage.getItem("UserIds")).userId
          }`
        );
        setIsNightMode(response2.data.userSettings.nightMode);
      } catch (error) {
        console.error("Failed to fetch user information:", error.message);
      }
    };

    getUserInformation();
  }, []);

  // useEffect(() => {
  //   console.log(isNightMode);
  // }, [isNightMode]);

  if (!userInformation) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${isNightMode ? `bg-[#221128]` : ""}`}>
      <Banner />
      <div className="min-h-[700px] p-4 lg:p-4 lg:flex lg:justify-between lg:gap-8">
        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <MdOutlineKeyboardArrowLeft
            className="w-[30px] ml-2"
            size={30}
            color={isNightMode ? "white" : "black"}
            onClick={() => navigate("/")}
          />

          <HiOutlineMenu
            size={30}
            color={isNightMode ? "white" : "black"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white p-4 space-y-4 shadow-md mb-2">
            <ProfileOptionButton name="My dashboard" route="/dashboard" />
            <Switch
              name="Night Mode"
              mode={isNightMode}
              onChange={toggleNightMode}
            />
            <ProfileOptionButton name="Mobile" route="/mobile" />
            <ProfileOptionButton name="Payments" route="/payments" />
            <ProfileOptionButton name="Complaints" route="/complaints" />
            <ProfileOptionButton name="Supports" route="/supports" />
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-1/4 lg:space-y-6 p-2 text-sm">
          <div className="bg-white rounded-lg">
            <ProfileOptionButton name="My dashboard" route="/dashboard" />
          </div>
          <div className="bg-white rounded-lg">
            <Switch
              name="Night Mode"
              mode={isNightMode}
              onChange={toggleNightMode}
            />
          </div>
          <div className="bg-white rounded-lg">
            <ProfileOptionButton name="Mobile" route="/mobile" />
          </div>
          <div className="bg-white rounded-lg">
            <ProfileOptionButton name="Payments" route="/payments" />
          </div>
          <div className="bg-white rounded-lg">
            <ProfileOptionButton name="Complaints" route="/complaints" />
          </div>
          <div className="bg-white rounded-lg">
            <ProfileOptionButton name="Supports" route="/supports" />
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`${
            isNightMode ? `lg:bg-[#4a374f]  text-white` : `bg-white`
          } lg:flex lg:flex-col lg:w-full lg:p-2`}
        >
          {/* Profile Header */}
          <div className="lg:flex lg:space-x-8">
            <div
              className={`${
                isNightMode ? `bg-[#85608e]` : `border`
              } p-6 shadow-md rounded-md lg:w-1/2`}
            >
              <div className="flex flex-col items-center mb-6 w-full p-1">
                <img
                  className="rounded-full w-40 h-40 object-cover"
                  src={userpicture}
                  alt="profilepic"
                />

                {/* Profile Information */}
                <div className="flex flex-col mt-4 w-full justify-center items-center h-full">
                  <div className="font-bold text-lg">
                    {userInformation.name}
                  </div>
                  <div
                    className={`text-xs text-wrap ${
                      isNightMode ? `text-[#bdbdbd]` : `text-[#7f7f7f]`
                    }`}
                  >
                    {userInformation.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/editProfile")}
                className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
              >
                Edit Profile
              </button>
            </div>
            {/* Account Details */}
            <div
              className={`p-6 shadow-md rounded-md lg:w-1/2 ${
                isNightMode ? `bg-[#85608e] lg:mt-0 mt-4` : `bg-white border`
              }`}
            >
              <h3 className="font-bold text-lg mb-4">My Account</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active account</span>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalContextComponent(<DeleteAccountModal />);
                    }}
                    className="bg-red-500 text-white p-2 rounded w-1/3 "
                  >
                    Delete Account
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Subscription</span>
                  <button className="bg-green-500 text-white p-2 rounded w-1/3">
                    Free
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span>Two Factor Authentication</span>
                  <button className="bg-blue-500 text-white p-2 rounded w-1/3">
                    Enabled
                  </button>
                </div>

                <div className="rounded-lg flex items-center justify-between">
                  <span>Logout</span>
                  <ProfileOptionButton name="Logout" exclusive />
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
