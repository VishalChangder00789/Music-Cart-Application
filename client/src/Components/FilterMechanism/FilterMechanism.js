import React, { useState } from "react";
import "./FilterMechanism.css";
import Input from "../Inputs/Inputs";

const FilterMechanism = () => {
  const [Search, setSearchItem] = useState("");
  const [GridView, setGridView] = useState(true);
  const [ListView, setListView] = useState(false);

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
        setValue={setSearchItem}
        borderRadius="14px"
      />

      <div className="FilterOptions"></div>
    </div>
  );
};

export default FilterMechanism;
