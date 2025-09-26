import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const FilterAttributeContext = createContext();

// Create Provider Component
export const FilterAttributeProvider = ({ children }) => {
  const [HeadphoneType, setHeadphoneType] = useState([]);
  const [Company, setCompany] = useState([]);
  const [Color, setColor] = useState([]);
  const [Price, setPrice] = useState([]);
  const [Featured, setFeatured] = useState([]);

  return (
    <FilterAttributeContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterAttributeContext.Provider>
  );
};

// Custom Hook to Use FilterContext
export const useFilterAttributeContext = () => {
  return useContext(FilterAttributeContext);
};
