import React, { useEffect, useState } from "react";
import "./_GLOBAL_MOBILE_FILTER.css";
import Tabs from "../../../Components/Tabs/Tabs";
import { GET_ALL_PRODUCTS } from "../../../Constants/Server_Path";
import axios from "axios";

// Files

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

  /*
  
  */
  /* Creating the options */
  const [HeadphoneType, setHeadphoneType] = useState([]);
  const [Company, setCompany] = useState([]);
  const [Color, setColor] = useState([]);
  const [Price, setPrice] = useState([]);

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
    <div className="FilterMechanism">
      <div className="FilterOptions">
        <div className="FilteringOptions">
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
        {/* Work a bit */}
        <div className="SortOptions">
          <Tabs
            Tabtitle="Sort by : Featured"
            options={FeaturedOptions}
            setStateValue={Parent_setFeatured}
          />
        </div>
      </div>
    </div>
  );
};

export default _GLOBAL_MOBILE_FILTER;
