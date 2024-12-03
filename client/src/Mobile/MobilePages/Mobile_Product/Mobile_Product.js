import React, { useEffect, useState } from "react";
import "./Mobile_Product.css";

// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_FILTER from "../../MobileComponents/_GLOBAL_MOBILE_FILTER/_GLOBAL_MOBILE_FILTER";
import _GLOBAL_MOBILE_TABS from "../../MobileComponents/_GLOBAL_MOBILE_TABS/_GLOBAL_MOBILE_TABS";
import _GLOBAL_MOBILE_PRODUCT_HOLDER from "../../MobileComponents/_GLOBAL_MOBILE_PRODUCT_HOLDER/_GLOBAL_MOBILE_PRODUCT_HOLDER";

const Mobile_Product = ({ setSelectedProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [Parent_HeadPhoneType, Parent_setHeadPhoneType] = useState("");
  const [Parent_Company, Parent_setCompany] = useState("");
  const [Parent_Color, Parent_setColor] = useState("");
  const [Parent_Price, Parent_setPrice] = useState("");
  const [Parent_Featured, Parent_setFeatured] = useState("");

  return (
    <div className="">
      <_GLOBAL_MOBILE_HEADER
        SearchActive={true}
        isBannerActive={true}
        // ButtonActivation={true}
        setSearchTerm={setSearchTerm}
      />

      <_GLOBAL_MOBILE_FILTER
        Parent_setHeadPhoneType={Parent_setHeadPhoneType}
        Parent_setCompany={Parent_setCompany}
        Parent_setColor={Parent_setColor}
        Parent_setPrice={Parent_setPrice}
        Parent_setFeatured={Parent_setFeatured}
      />

      <_GLOBAL_MOBILE_PRODUCT_HOLDER
        setSelectedProduct={setSelectedProduct}
        searchTerm={searchTerm}
        Parent_HeadPhoneType={Parent_HeadPhoneType}
        Parent_Company={Parent_Company}
        Parent_Color={Parent_Color}
        Parent_Price={Parent_Price}
        Parent_Featured={Parent_Featured}
      />

      {/* <_GLOBAL_MOBILE_FOOTER OptionFooter={true} /> */}
    </div>
  );
};

export default Mobile_Product;
