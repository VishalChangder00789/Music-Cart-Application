import React, { useState } from "react";
import "./Tabs.css";

const Tabs = ({ Tabtitle }) => {
  const options = ["Headphone1", "Headphone2", "Headphone3", "Headphone4"];
  const [openDropDown, setOpenDropDown] = useState(false);

  const handleOpenModal = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
    <div onClick={(e) => handleOpenModal()} className="TabsContainer">
      {Tabtitle}
      {openDropDown ? (
        <div className="TabsOptions">
          {options.map((m) => {
            return <div className="TabsItem">{m}</div>;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Tabs;
