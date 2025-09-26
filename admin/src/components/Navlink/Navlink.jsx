import React from "react";
import { useNavigate } from "react-router-dom";

const Navlink = ({ name, route }) => {
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };
  return (
    <div
      className="p-2 bg-gray-300 rounded-md cursor-pointer m-1 justify-center items-center"
      onClick={() => handleNavigation(route)}
    >
      {name}
    </div>
  );
};

export default Navlink;
