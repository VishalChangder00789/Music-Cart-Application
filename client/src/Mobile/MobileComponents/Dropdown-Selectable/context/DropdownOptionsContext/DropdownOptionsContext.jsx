import { useContext, createContext, Children } from "react";
import React, { useState } from "react";

const DropdownOptionsContext = createContext();

const DropdownOptionsProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("Aye Bhai");
  const [options, setOptions] = useState([]);

  return (
    <DropdownOptionsContext.Provider
      value={{ selectedOption, setSelectedOption, options, setOptions }}
    >
      {children}
    </DropdownOptionsContext.Provider>
  );
};

export { DropdownOptionsContext, DropdownOptionsProvider };
export const useDropdownOptions = () => useContext(DropdownOptionsContext);
