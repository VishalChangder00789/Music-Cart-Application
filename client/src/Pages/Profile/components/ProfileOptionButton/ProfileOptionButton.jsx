import React from "react";
import { useNavigate } from "react-router-dom";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ProfileOptionButton = ({ name = "Default", route, Icon }) => {
  const navigate = useNavigate();
  const handleProfileOptionButtonClick = () => {
    if (route) {
      navigate(route);
    } else {
      // Signout Login
    }
  };

  return (
    <div
      onClick={handleProfileOptionButtonClick}
      className={`${
        name === "Edit Profile"
          ? `bg-[#972fff] text-white justify-center`
          : "bg-[#ffffff] border text-black justify-between"
      } mt-8  w-full flex  items-center p-2 rounded-md font-semibold`}
    >
      {Icon && (
        <div className="w-[30px]">
          <Icon size={20} />
        </div>
      )}

      <div className="min-w-3/12">{name}</div>
      {name === "Edit Profile" ? (
        ""
      ) : (
        <MdOutlineKeyboardArrowRight className="w-[30px]" size={25} />
      )}
    </div>
  );
};

export default ProfileOptionButton;
