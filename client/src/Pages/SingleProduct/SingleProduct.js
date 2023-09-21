import React, { useEffect, useState } from "react";
import "./SingleProduct.css";

const SingleProduct = ({ SelectedProduct }) => {
  const [ProductByUser, setProductByUser] = useState();

  useEffect(() => {
    if (!ProductByUser) {
      setProductByUser(SelectedProduct);
    }
    console.log(ProductByUser);
  });

  return <div className="_GLOBAL_PAGE_INNER_HOLDER">a</div>;
};

export default SingleProduct;
