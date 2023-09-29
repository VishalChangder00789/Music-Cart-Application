import React from "react";
import "./Mobile_Product.css";

// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_FILTER from "../../MobileComponents/_GLOBAL_MOBILE_FILTER/_GLOBAL_MOBILE_FILTER";

const Mobile_Product = () => {
  return (
    <div className="_GLOBAL_MOBILE_HOLDER_ADJUSTED">
      <_GLOBAL_MOBILE_HEADER
        SearchActive={true}
        isBannerActive={true}
        // ButtonActivation={true}
      />

      <_GLOBAL_MOBILE_FILTER />

      <_GLOBAL_MOBILE_FOOTER OptionFooter={true} />
    </div>
  );
};

export default Mobile_Product;
