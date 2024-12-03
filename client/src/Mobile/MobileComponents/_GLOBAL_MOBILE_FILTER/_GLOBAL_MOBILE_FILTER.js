import React, { useEffect, useState } from "react";
import "./_GLOBAL_MOBILE_FILTER.css";
import Tabs from "../../../Components/Tabs/Tabs";
import { GET_ALL_PRODUCTS } from "../../../Constants/Server_Path";
import axios from "axios";
import { FaFilter } from "react-icons/fa"; // Import a filter icon from react-icons

import { SetProductAttribute } from "../../../Controller/Utilities";

const _GLOBAL_MOBILE_FILTER = ({
  setShowGrid,
  Parent_setHeadPhoneType,
  Parent_setCompany,
  Parent_setColor,
  Parent_setPrice,
  Parent_setSearchTerm,
  Parent_setFeatured,
}) => {
  const [products, setProducts] = useState([]);
  const [showTabs, setShowTabs] = useState(false); // State to toggle Tabs display

  const [HeadphoneType, setHeadphoneType] = useState([]);
  const [Company, setCompany] = useState([]);
  const [Color, setColor] = useState([]);
  const [Price, setPrice] = useState([]);

  const FeaturedOptions = ["Price : Lowest", "Name : (A-Z)"];

  // Fetch products from the API
  useEffect(() => {
    axios.get(GET_ALL_PRODUCTS).then((data) => {
      setProducts(data.data.products);
    });
  }, []);

  // Set product attributes based on fetched data
  useEffect(() => {
    SetProductAttribute(
      products,
      setHeadphoneType,
      setCompany,
      setColor,
      setPrice
    );
  }, [products]);

  // Toggle the visibility of the tabs
  const handleToggleTabs = () => {
    setShowTabs((prevShowTabs) => !prevShowTabs);
  };

  return (
    <div className="flex flex-col mt-8 fixed top-14">
      <div
        style={{
          fontFamily: "Poppins , sans-serif",
          fontWeight: "500",
          fontStyle: "normal",
        }}
        className="bg-white relative flex shadow-[#6f6f6f6d] flex-col items-center rounded-full justify-center p-4 ml-4 cursor-pointer shadow-md transition-shadow duration-300 transform hover:-translate-y-1 animated-filter"
        onClick={handleToggleTabs}
      >
        <FaFilter size={20} color="#972fff" />
      </div>

      {showTabs && (
        <div className="flex flex-col mt-2 ml-4 shadow-md shadow-[#696969] w-[300px] h-[350px] bg-white absolute top-full rounded-md">
          <div className="mt-5 flex w-full text-xs items-center p-2 justify-around">
            <Tabs
              Tabtitle="Headphone Type"
              options={HeadphoneType}
              setStateValue={Parent_setHeadPhoneType}
            />
            <Tabs
              Tabtitle="Company"
              options={Company}
              setStateValue={Parent_setCompany}
            />
          </div>
          <div className="border mt-4">
            <Tabs
              Tabtitle="Colour"
              options={Color}
              setStateValue={Parent_setColor}
              color
            />
          </div>
          <div className="flex mt-4 justify-around">
            <Tabs
              Tabtitle="Price"
              options={Price}
              setStateValue={Parent_setPrice}
            />
            <Tabs
              Tabtitle="Sort by : Featured"
              options={FeaturedOptions}
              setStateValue={Parent_setFeatured}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default _GLOBAL_MOBILE_FILTER;
