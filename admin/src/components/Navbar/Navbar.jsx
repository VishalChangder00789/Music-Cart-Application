import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navlink from "../Navlink/Navlink";

const Navbar = () => {
  const navigate = useNavigate();
  const [navbarOptions, setNavbarOptions] = useState([
    {
      name: "Admin Panel",
      route: "/",
    },
    {
      name: "Access Control",
      route: "/access-control",
    },
    {
      name: "Add Product",
      route: "/add-products",
    },
    {
      name: "Job Control",
      route: "/job-control",
    },
    {
      name: "Edit Products",
      route: "/edit-products",
    },
  ]);
  return (
    <div className="h-16 flex items-center p-2 justify-between bg-gray-500 shadow-md shadow-[#9e9e9e]">
      <div className="flex justify-evenly">
        {navbarOptions.map((nav) => {
          return <Navlink name={nav.name} route={nav.route} />;
        })}
      </div>
      <div className="w-1/3 text-lg text-white">
        <div className="bg-[#0000005c] w-1/3 flex justify-center items-center p-2 rounded-md shadow-md">
          Admin Center
        </div>
      </div>
      <div className="w-1/12 p-2 bg-gray-300 rounded-md cursor-pointer flex justify-center items-center">
        LogIn
      </div>
    </div>
  );
};

export default Navbar;
