import React, { useState } from "react";
import "./FilterMechanism.css";
import Input from "../Inputs/Inputs";
import Tabs from "../Tabs/Tabs";

// Files
import GridIcon from "../../Assets/GridView.png";
import ListIcon from "../../Assets/ListView.png";

const FilterMechanism = ({ setShowGrid }) => {
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

      <div className="FilterOptions">
        <div className="LayoutButtons">
          <div onClick={() => setShowGrid(true)} className="GridViewButton">
            <img src={GridIcon} />
          </div>
          <div onClick={() => setShowGrid(false)} className="ListViewButton">
            <img src={ListIcon} />
          </div>
        </div>
        <div className="FilteringOptions">
          <Tabs Tabtitle="Cars" />
          <Tabs Tabtitle="Cars" />
          <Tabs Tabtitle="Cars" />
          <Tabs Tabtitle="Cars" />
        </div>
        <div className="SortOptions">
          <Tabs Tabtitle="Sort by : Featured" />
        </div>
      </div>
    </div>
  );
};

export default FilterMechanism;
