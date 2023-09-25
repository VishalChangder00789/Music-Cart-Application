import React, { useState } from "react";
import "./Tabs.css";

const Tabs = ({ Tabtitle, options, setStateValue }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [tabOptionSelection, setTabOptionSelection] = useState("");

  const handleTabsClick = (selection) => {
    if (selection === "None") {
      selection = "";
    }
    setTabOptionSelection(selection);
    setStateValue(selection);
  };

  const handleOpenModal = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
    <div onClick={(e) => handleOpenModal()} className="TabsContainer">
      {!tabOptionSelection ? Tabtitle : tabOptionSelection}
      {openDropDown ? (
        <div className="TabsOptions">
          {options.map((m) => {
            return (
              <div onClick={() => handleTabsClick(m)} className="TabsItem">
                {m}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Tabs;
