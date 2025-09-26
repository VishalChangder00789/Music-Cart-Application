import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const FilterContext = createContext();

// Create Provider Component
export const FilterProvider = ({ children }) => {
  // Selected attributes by the user
  const [selectedHeadphoneType, setSelectedHeadphoneType] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedFeatured, setSelectedFeatured] = useState(null);
  const FeaturedOptions = ["Price : Lowest", "Name : (A-Z)"];
  const [sortedProducts, setSortedProducts] = useState([]);

  // asda
  return (
    <FilterContext.Provider
      value={{
        // User-selected filter options
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom Hook to Use FilterContext
export const useFilterContext = () => {
  return useContext(FilterContext);
};
