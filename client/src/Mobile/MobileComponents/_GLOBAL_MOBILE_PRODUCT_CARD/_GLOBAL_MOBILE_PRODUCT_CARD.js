import React from "react";
import "./_GLOBAL_MOBILE_PRODUCT_CARD.css";
import { useNavigate } from "react-router-dom";
import { SINGLEPRODUCT } from "../../../Constants/Client_Path";
import { sendProductIdToLocalStorage } from "../../../Controller/localStorageConnection";

const _GLOBAL_MOBILE_PRODUCT_CARD = ({ setSelectedProduct, product }) => {
  const navigate = useNavigate();

  const handleProductClick = async (e, sentProduct) => {
    e.preventDefault();
    await setSelectedProduct(sentProduct);
    await sendProductIdToLocalStorage(sentProduct);
    navigate(SINGLEPRODUCT);
  };

  return (
    <div
      onClick={(e) => handleProductClick(e, product._id)}
      className="_GLOBAL_MOBILE_PRODUCT_CARD"
    >
      <img src={product.imageURL[0]} />
      <div className="_GLOBAL_MOBILE_PRODUCT_CARD_Details">
        <div className="_mobileDisplayName">{product.codeName}</div>
        <span className="_mobileDisplayName">
          Price - &#8377; {product.price}
        </span>
        <span className="_mobileDisplayName">
          {product.color} | {product.productType.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default _GLOBAL_MOBILE_PRODUCT_CARD;
