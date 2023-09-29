import React from "react";
import "./_GLOBAL_MOBILE_FILTER.css";

import _GLOBAL_MOBILE_TABS from "../_GLOBAL_MOBILE_TABS/_GLOBAL_MOBILE_TABS";

const _GLOBAL_MOBILE_FILTER = () => {
  const TabOption = ["Cars", "Cars", "Cars", "Cars", "Cars"];

  return (
    <div className="_GLOAL_MOBILE_FILTER_CONTAINER">
      <_GLOBAL_MOBILE_TABS
        TabtTitle="Sort by"
        TabOption={["Cars", "Cars", "Cars", "Cars"]}
      />

      <_GLOBAL_MOBILE_TABS
        TabtTitle="Sort by"
        TabOption={["Cars", "Cars", "Cars", "Cars"]}
      />

      <_GLOBAL_MOBILE_TABS
        TabtTitle="Sort by"
        TabOption={["Cars", "Cars", "Cars", "Cars"]}
      />
      <_GLOBAL_MOBILE_TABS
        TabtTitle="Sort by"
        TabOption={["Cars", "Cars", "Cars", "Cars"]}
      />
      <_GLOBAL_MOBILE_TABS
        TabtTitle="Sort by"
        TabOption={["Cars", "Cars", "Cars", "Cars"]}
      />

      <_GLOBAL_MOBILE_TABS
        TabtTitle="Sort by"
        TabOption={["Cars", "Cars", "Cars", "Cars"]}
      />

      <_GLOBAL_MOBILE_TABS
        TabtTitle="Sort by"
        TabOption={["Cars", "Cars", "Cars", "Cars"]}
      />
    </div>
  );
};

export default _GLOBAL_MOBILE_FILTER;
