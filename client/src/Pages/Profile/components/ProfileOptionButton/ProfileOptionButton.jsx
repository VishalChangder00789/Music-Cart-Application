import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ProfileOptionButton = ({
  name = "Default",
  route,
  Icon,
  exclusive = false,
}) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleProfileOptionButtonClick = () => {
    if (route) {
      navigate(route);
    } else {
      // Signout Logic
      localStorage.removeItem("UserIds");
      localStorage.removeItem("userToken");
      localStorage.removeItem("productId");
      navigate("/");
    }
  };

  return (
    <div
      onClick={handleProfileOptionButtonClick}
      className={`text-black ${
        name === "Logout"
          ? "justify-end w-1/3 bg-red-500 text-white"
          : "justify-between p-2 w-full font-semibold"
      } flex  items-center rounded-md cursor-pointer`}
    >
      {Icon && (
        <div className="w-[30px]">
          <Icon size={20} />
        </div>
      )}

      <div
        className={`${
          exclusive
            ? `flex items-center p-2 w-full justify-center`
            : `text-black`
        }`}
      >
        {name}
      </div>
      {name === "Edit Profile" ? (
        ""
      ) : exclusive ? (
        ""
      ) : (
        <MdOutlineKeyboardArrowRight className="w-[30px]" size={25} />
      )}
    </div>
  );
};

export default ProfileOptionButton;
