import React, { useEffect } from "react";
import { useUserInformation } from "./contexts/user-information";
import Banner from "../../Components/Banner/Banner";
import axios from "axios";

// Icons
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ProfileOptionButton from "./components/ProfileOptionButton/ProfileOptionButton";
import { IoLocationSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { HiMiniLanguage } from "react-icons/hi2";
import { MdDocumentScanner } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Switch from "./components/Switch/Switch";
import { MdDarkMode } from "react-icons/md";
import { getIdsFromLocalStorage } from "../../Controller/localStorageConnection";

const Profile = () => {
  const { userInformation, setUserInformation } = useUserInformation();
  const navigate = useNavigate();

  return (
    <div>
      <Banner />
      <div className="min-h-[700px] p-4">
        <div className="flex justify-betweeen mt-4 items-center">
          <MdOutlineKeyboardArrowLeft
            className="w-[30px] ml-2"
            size={30}
            onClick={() => navigate("/")}
          />
          <div className="w-2/3 text-lg flex justify-center items-center font-semibold">
            Profile
          </div>
        </div>

        {/* Profile Visibility */}

        <div className="mt-10 flex items-center">
          <div className="w-[55px] h-14 rounded-[50%] bg-[#585858]"></div>
          <div className="flex flex-col ml-2">
            <div className="font-bold">{userInformation.name}</div>
            <div className="text-sm text-[#7f7f7f]">
              {userInformation.email}
            </div>
          </div>
        </div>

        {/* Edit Button Visibilty */}
        <div className="mt-4">
          <ProfileOptionButton name="Edit Profile" route="/editProfile" />
        </div>

        <div className="mt-4">
          <ProfileOptionButton
            name="Address"
            Icon={IoLocationSharp}
            route="/editAddress"
          />
        </div>

        <div className="mt-4">
          <ProfileOptionButton
            name="User Settings"
            Icon={IoSettings}
            route="/userSettings"
          />
        </div>

        <div>
          <Switch Icon={MdDarkMode} name="DarkMode" />
        </div>

        <div className="mt-4">
          <ProfileOptionButton name="Language" Icon={HiMiniLanguage} route="" />
        </div>

        <div className="mt-4">
          <ProfileOptionButton
            name="Terms and Services"
            Icon={MdDocumentScanner}
            route=""
          />
        </div>

        <div className="mt-4">
          <ProfileOptionButton name="LogOut" Icon={TbLogout} route="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
