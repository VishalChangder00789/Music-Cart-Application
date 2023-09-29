import React, { useState } from "react";
import "./_GLOBAL_MOBILE_TABS.css";

const _GLOBAL_MOBILE_TABS = ({ TabtTitle }) => {
  const [OpenDropDown, setOpenDropdown] = useState(false);

  const TabOption = ["Cars", "Cars", "Cars", "Cars", "Cars"];

  return (
    <div
      onClick={() => setOpenDropdown(!OpenDropDown)}
      className="_GLOBAL_MOBILE_TABS"
    >
      <div>{TabtTitle}</div>
      {OpenDropDown ? (
        <div className="_MOBILE_TAB_INNER_HOLDER">
          {TabOption
            ? TabOption.map((item) => {
                return <div>{item}</div>;
              })
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default _GLOBAL_MOBILE_TABS;
