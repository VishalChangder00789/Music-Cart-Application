import React, { useEffect, useRef, useState } from "react";
import "./Tabs.css";

const Tabs = ({
  Tabtitle,
  options,
  setStateValue,
  price = false,
  color = false,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [tabOptionSelection, setTabOptionSelection] = useState("");
  const [sliderValue, setSliderValue] = useState(options[0]);
  const [minState, setMin] = useState(0);
  const [maxState, setMax] = useState(0);

  const myComponentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        myComponentRef.current &&
        !myComponentRef.current.contains(event.target)
      ) {
        // Click occurred outside of the component
        setOpenDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  const determineProductColor = (m) => {
    const productColor = m.toLowerCase();

    if (productColor === "white") {
      return "bg-white";
    }
    if (productColor === "black") {
      return "bg-black";
    }
    if (productColor === "silver") {
      return "bg-gray-300";
    }
    if (productColor === "grey") {
      return "bg-gray-500";
    }
    return `bg-${productColor}-500`;
  };

  if (color) {
    return (
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: "500",
          fontStyle: "normal",
        }}
        className="border p-4 flex flex-col justify-around"
      >
        <div>Color</div>
        <div className="flex w-full justify-around mt-4">
          {options.map((m, index) => (
            <div
              key={index} // Add a key for each dropdown item
              onClick={() => handleTabsClick(m)}
              className={`p-2 ${determineProductColor(
                m
              )} cursor-pointer rounded-[50%] border border-black`}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: "500",
        fontStyle: "normal",
      }}
      ref={myComponentRef}
      onClick={handleOpenModal}
      className="border bg-white rounded-sm h-10 w-2/5 text-xs flex justify-center items-center relative"
    >
      {!tabOptionSelection ? Tabtitle : tabOptionSelection}
      {openDropDown && (
        <div className="z-10 min-h-[50px] max-h-[80px] absolute overflow-auto top-full border border-gray-300 mt-1 w-full bg-white rounded-sm shadow-lg">
          {options.map((m, index) => (
            <div
              key={index} // Add a key for each dropdown item
              onClick={() => handleTabsClick(m)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {m}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tabs;
