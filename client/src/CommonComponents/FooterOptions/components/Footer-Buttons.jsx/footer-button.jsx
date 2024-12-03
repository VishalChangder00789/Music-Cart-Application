import React from "react";
import { GoHomeFill } from "react-icons/go";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const FooterButtons = ({
  iconsType,
  selectedIcon,
  setSelectedIcon,
  numberOfItems,
}) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    setSelectedIcon(iconsType); // Update the selected icon when clicked
  };

  const renderIcon = () => {
    switch (iconsType) {
      case "HOME":
        return (
          <div
            onClick={() => handleClick("/")}
            className={`flex flex-col items-center justify-center ${
              selectedIcon === "HOME"
                ? "p-2 w-10 h-10 shadow-md shadow-[#4e4e4e57] rounded-md bg-[#972fff]"
                : ""
            }`}
          >
            <GoHomeFill
              size={28}
              color={selectedIcon === "HOME" ? "white" : "grey"}
            />
            {/* <div
              style={{
                fontFamily: "Poppins , sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
              }}
              className={`${
                selectedIcon === "HOME" ? "text-white" : "text-[#8b8b8b]"
              } text-xs`}
            >
              HOME
            </div> */}
          </div>
        );
      case "CART":
        return (
          <div
            onClick={() => handleClick("/viewCart")}
            className={`relative flex flex-col items-center justify-center ${
              selectedIcon === "CART"
                ? "p-2 w-10 h-10 shadow-md shadow-[#4e4e4e57] rounded-md bg-[#972fff]"
                : ""
            }`}
          >
            {numberOfItems && numberOfItems > 0 ? (
              <div className="absolute text-xs p-2 -top-2 rounded-[50%] w-5 h-5 bg-red-500 text-white flex items-center justify-center -right-2">
                {numberOfItems}
              </div>
            ) : (
              ""
            )}
            <HiMiniShoppingCart
              size={25}
              color={selectedIcon === "CART" ? "white" : "grey"}
            />
            {/* <div
              style={{
                fontFamily: "Poppins , sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
              }}
              className={`${
                selectedIcon === "CART" ? "text-white" : "text-[#8b8b8b]"
              } text-xs`}
            >
              CART
            </div> */}
          </div>
        );
      case "PROFILE":
        return (
          <div
            onClick={() => handleClick("/profile")}
            className={`flex flex-col items-center justify-center ${
              selectedIcon === "PROFILE"
                ? "p-2 w-10 h-10 shadow-md shadow-[#4e4e4e57] rounded-md bg-[#972fff]"
                : ""
            }`}
          >
            <CgProfile
              size={28} // Increased size of the profile icon to match the container
              color={selectedIcon === "PROFILE" ? "white" : "grey"}
            />
            {/* <div
              style={{
                fontFamily: "Poppins , sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
              }}
              className={`mt-1 ${
                selectedIcon === "PROFILE" ? "text-white" : "text-[#8b8b8b]"
              } text-xs`}
            >
              PROFILE
            </div> */}
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderIcon()}</div>;
};

export default FooterButtons;
