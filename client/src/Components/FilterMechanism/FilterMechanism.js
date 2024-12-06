import React, { useEffect, useState } from "react";
import "./FilterMechanism.css";
import Input from "../Inputs/Inputs";
import Tabs from "../Tabs/Tabs";
import { GET_ALL_PRODUCTS } from "../../Constants/Server_Path";
import axios from "axios";

// Files
import GridIcon from "../../Assets/GridView.png";
import ListIcon from "../../Assets/ListView.png";
import { SetProductAttribute } from "../../Controller/Utilities";

import { BsGrid1X2Fill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

const FilterMechanism = ({
  setShowGrid,
  Parent_setHeadPhoneType,
  Parent_setCompany,
  Parent_setColor,
  Parent_setPrice,
  Parent_setSearchTerm,
  Parent_setFeatured,
  showGrid,
}) => {
  const [GridView, setGridView] = useState(true);
  const [ListView, setListView] = useState(false);
  const [products, setProducts] = useState([]);

  /*
  
  */
  /* Creating the options */
  const [HeadphoneType, setHeadphoneType] = useState([]);
  const [Company, setCompany] = useState([]);
  const [Color, setColor] = useState([]);
  const [Price, setPrice] = useState([]);
  const [Featured, setFeatured] = useState([]);

  // Setting up the Featured deals
  const FeaturedOptions = ["Price : Lowest", "Name : (A-Z)"];

  // Setting up all the product attributes
  // Fetching all the products and creating options
  useEffect(() => {
    axios.get(GET_ALL_PRODUCTS).then((data) => {
      // setProducts(data.data.products);
      setProducts(data.data.products);
    });
  }, []);

  useEffect(() => {
    SetProductAttribute(
      products,
      setHeadphoneType,
      setCompany,
      setColor,
      setPrice
    );

    // console.log(HeadphoneType, Company, Color, Price);
  }, [products]);

  return (
    <div className="flex w-full justify-between">
      <div className="flex w-1/3 items-center justify-start cursor-pointer">
        <div onClick={() => setShowGrid(true)} className="flex items-center">
          <BsGrid1X2Fill
            size={showGrid ? 28 : 22}
            color={showGrid ? "black" : "grey"}
          />
        </div>
        <div onClick={() => setShowGrid(false)} className="flex items-center">
          <FaThList
            size={!showGrid ? 28 : 25}
            className="ml-2"
            color={!showGrid ? "black" : "grey"}
          />
        </div>
      </div>

      <div className="flex w-1/3 cursor-pointer items-center justify-between">
        <FaFilter color="#9c41b0" size={35} className="mr-4" />
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
        <Tabs
          Tabtitle="Colour"
          options={Color}
          setStateValue={Parent_setColor}
        />
        <Tabs
          Tabtitle="Price"
          options={Price}
          setStateValue={Parent_setPrice}
        />
      </div>

      <div className="lg:flex lg:justify-end lg:items-center lg:w-1/3 cursor-pointer">
        <Tabs
          Tabtitle="Sort by : Featured"
          options={FeaturedOptions}
          setStateValue={Parent_setFeatured}
        />
      </div>
    </div>
  );
};

export default FilterMechanism;
