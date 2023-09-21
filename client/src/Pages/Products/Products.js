import React from "react";
import "./Products.css";
import ProductSuperHeader from "../../Components/ProductHeader/ProductSuperHeader";
import Banner from "../../Components/Banner/Banner";

const Products = () => {
  return (
    <div className="_GLOBAL_PAGE_INNER_HOLDER">
      <ProductSuperHeader
        ContainerHeight="30px"
        ContainerWidth="100%"
        PhoneNumber="912121131313"
        MiddleMessage="Get 50% off on selected items | Shop Now"
        BackgroundColor="#2E0052"
        ImageHeight="80%"
        ImageWidth="20%"
      />
      <div className="_GLOBAL_MAIN_CONTENT_HOLDER">
        <Banner />
      </div>
    </div>
  );
};

export default Products;
