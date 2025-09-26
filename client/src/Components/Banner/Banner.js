import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import useScreenSize from "../../CustomHooks/useScreenSize";
import useContextController from "./contextController";
import HeaderLogoImage from "../../Assets/HeaderLogoMobile.png";
import NavigationPanel from "../NavigationPanel.js/NavigationPanel";

const Banner = () => {
  const { width } = useScreenSize();
  const { pathname } = useLocation();
  const { searchContent, setSearchContent, isNightMode } =
    useContextController();

  const exculudedPaths = [
    "/login",
    "/register",
    "/profile",
    "/editProfile",
    "/forget-password",
  ];

  const handleSearchChange = (e) => {
    setSearchContent(e.target.value);
  };

  return (
    <div
      className={`z-50 ${
        isNightMode ? "bg-[#341539]" : `bg-[#3c1143]`
      } flex p-2 min-h-16 items-center justify-between lg:min-h-10 lg:p-4 lg:justify-between lg:sticky lg:top-0 lg:z-20`}
    >
      <img className="h-8" src={HeaderLogoImage} alt="Logo" />
      {exculudedPaths.includes(pathname) ? (
        " "
      ) : (
        <div
          className={`${
            isNightMode ? `bg-[#333333]` : `bg-white`
          } flex justify-between items-center w-5/12 lg:w-4/12 p-2 rounded-sm`}
        >
          <BiSearchAlt />
          <input
            value={searchContent}
            onChange={handleSearchChange}
            className={`outline-none w-10/12 h-full lg:w-full lg:ml-2 text-xs bg-transparent`}
            placeholder="Search Music cart"
          />
        </div>
      )}

      {width > 768 && <NavigationPanel />}
    </div>
  );
};

export default Banner;
