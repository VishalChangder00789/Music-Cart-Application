import React from "react";
import { BiExpandHorizontal } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import { GoHomeFill } from "react-icons/go";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";

const NavigationPanel = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="h-full flex items-center justify-between">
      <div
        onClick={() => handleClick("/")}
        className={`w-[50px] flex justify-evenly items-center p-2 rounded-sm h-10 ${
          pathname === "/" ? "bg-[#9c41b0]" : ""
        }`}
      >
        <GoHomeFill color="white" size={pathname === "/" ? 25 : 18} />
      </div>
      <div
        onClick={() => handleClick("/viewCart")}
        className={`w-1/3 flex justify-center items-center p-2 rounded-sm h-10 ${
          pathname === "/viewCart" ? "bg-[#9c41b0]" : ""
        }`}
      >
        <HiMiniShoppingCart
          color="white"
          size={pathname === "/viewCart" ? 25 : 18}
        />
      </div>
      <div
        onClick={() => handleClick("/profile")}
        className={`w-1/3 flex justify-center items-center p-2 rounded-sm h-10 ${
          pathname === "/profile" ? "bg-[#9c41b0]" : ""
        }`}
      >
        <RiUserSettingsFill
          color="white"
          size={pathname === "/profile" ? 25 : 18}
        />
      </div>
    </div>
  );
};

export default NavigationPanel;
