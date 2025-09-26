import React, { useEffect } from "react";
import "./FilterMechanism.css";
import Tabs from "../Tabs/Tabs";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaThList, FaFilter } from "react-icons/fa";
import { SetProductAttribute } from "../../Controller/Utilities";
import { useFilterAttributeContext } from "../../Contexts/FilterAttributeContext/FilterAttributeContext";
import { useProducts } from "../../Contexts/Products/Products";
import { useFilterContext } from "../../Contexts/FilterContext/FilterContext";

const FilterMechanism = ({ setShowGrid, showGrid }) => {
  const { products } = useProducts();

  const {
    HeadphoneType,
    setHeadphoneType,
    Company,
    setCompany,
    Color,
    setColor,
    Price,
    setPrice,
    Featured,
    setFeatured,
  } = useFilterAttributeContext();

  const {
    selectedHeadphoneType,
    setSelectedHeadphoneType,
    selectedCompany,
    setSelectedCompany,
    selectedColor,
    setSelectedColor,
    selectedPrice,
    setSelectedPrice,
    selectedFeatured,
    setSelectedFeatured,
    FeaturedOptions,
    sortedProducts,
    setSortedProducts,
  } = useFilterContext();

  // Populate filter attributes when products change
  useEffect(() => {
    SetProductAttribute(
      products,
      setHeadphoneType,
      setCompany,
      setColor,
      setPrice
    );
  }, [products, setHeadphoneType, setCompany, setColor, setPrice]);

  const resetFilter = () => {
    setSortedProducts(products);
    setSelectedHeadphoneType("");
    setSelectedCompany("");
    setSelectedColor("");
    setSelectedPrice(0);
    setSelectedFeatured(null);
  };

  return (
    <div className="flex w-full justify-between">
      {/* View Mode Selector */}
      <div className="flex w-1/3 items-center justify-start cursor-pointer">
        <div onClick={() => setShowGrid(true)} className="flex items-center">
          <BsGrid1X2Fill
            size={showGrid ? 28 : 22}
            color={showGrid ? "#9c41b0" : "grey"}
          />
        </div>
        <div onClick={() => setShowGrid(false)} className="flex items-center">
          <FaThList
            size={!showGrid ? 28 : 25}
            className="ml-2"
            color={!showGrid ? "#9c41b0" : "grey"}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex w-1/3 cursor-pointer items-center justify-between">
        <FaFilter
          onClick={resetFilter}
          color={sortedProducts.length !== products.length ? `#9c41b0` : "grey"}
          size={35}
          className="mr-4"
        />
        <Tabs
          Tabtitle="Headphone Type"
          options={HeadphoneType}
          setStateValue={setSelectedHeadphoneType}
          selected={selectedHeadphoneType}
        />
        <Tabs
          Tabtitle="Company"
          options={Company}
          setStateValue={setSelectedCompany}
          selected={selectedCompany}
        />
        <Tabs
          Tabtitle="Colour"
          options={Color}
          setStateValue={setSelectedColor}
          selected={selectedColor}
        />
        <Tabs
          Tabtitle="Price"
          options={Price}
          setStateValue={setSelectedPrice}
          selected={selectedPrice}
        />
      </div>

      {/* Sort Options */}
      <div className="lg:flex lg:justify-end lg:items-center lg:w-1/3 cursor-pointer">
        <Tabs
          Tabtitle="Sort by : Featured"
          options={FeaturedOptions}
          setStateValue={setSelectedFeatured}
        />
      </div>
    </div>
  );
};

export default FilterMechanism;
