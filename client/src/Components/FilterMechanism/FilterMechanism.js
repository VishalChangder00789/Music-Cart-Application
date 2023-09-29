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

const FilterMechanism = ({
  setShowGrid,
  Parent_setHeadPhoneType,
  Parent_setCompany,
  Parent_setColor,
  Parent_setPrice,
  Parent_setSearchTerm,
  Parent_setFeatured,
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
    <div className="FilterMechanism">
      <Input
        type="text"
        placeholder="Enter Search"
        label
        borderColor
        width="98%"
        height="100%"
        ContainerHeight="60px"
        ContainerWidth="100%"
        marginTop="0px"
        containerMarginTop="0px"
        setValue={Parent_setSearchTerm}
        borderRadius="70px"
      />

      <div className="FilterOptions">
        <div className="LayoutButtons">
          <div onClick={() => setShowGrid(true)} className="Icon">
            <img src={GridIcon} />
          </div>
          <div onClick={() => setShowGrid(false)} className="Icon">
            <img src={ListIcon} />
          </div>
        </div>
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

export default FilterMechanism;
