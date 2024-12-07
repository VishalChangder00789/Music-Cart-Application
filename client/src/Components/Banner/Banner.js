import React from "react";
import "./Banner.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Logo and Images
import HeaderLogoImage from "../../Assets/HeaderLogoMobile.png";
import { BiSearchAlt } from "react-icons/bi";

// Hooks
import useScreenSize from "../../CustomHooks/useScreenSize";
import NavigationPanel from "../NavigationPanel.js/NavigationPanel";

const Banner = ({ navigationRoute }) => {
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const pathname = useLocation().pathname;

  return (
    <div className="bg-[#3c1143] flex p-2 min-h-16 items-center justify-between  lg:min-h-10 lg:p-4 lg:justify-between lg:sticky lg:top-0 lg:z-20">
      <img className="h-8" src={HeaderLogoImage} />
      {pathname === "/login" || pathname === "/register" ? (
        " "
      ) : (
        <div className="bg-white flex justify-between items-center w-5/12 lg:w-4/12 p-1 rounded-sm ">
          <BiSearchAlt />
          <input
            className="outline-none w-10/12 h-full lg:w-full lg:ml-2 text-xs"
            placeholder="Search Music cart"
          />
        </div>
      )}

      {width > 768 ? (
        <div className="w-[150px] mr-4">
          <NavigationPanel />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Banner;
