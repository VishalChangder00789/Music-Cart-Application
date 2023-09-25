import React, { useEffect, useState } from "react";
import "./CartItem.css";
import QuantityControl from "../QuantityControl/QuantityControl";

const CartItem = ({ key, singleProduct }) => {
  const details = singleProduct.details.fetchedProduct;
  const buisnessDetails = singleProduct;

  const price = details.price;
  const productId = details._id;
  const totalPrice = price * buisnessDetails.quantity;
  const codeName = details.codeName;
  const quantity = buisnessDetails.quantity;
  const color = details.color;
  const inStock = details.available ? "In-Stock" : "Out of Stock";

  console.log(details);

  return (
    CartItem && (
      <div key={CartItem._id} className="CartItemContainer">
        <div className="CartItemImageContainer">
          <img src={singleProduct.details.fetchedProduct.imageURL[0]} />
        </div>
        <div className="CartItemDetails">
          <div className="FlexCol width1">
            <div className="Heading">{codeName}</div>
            <div>{color}</div>
            <div>{inStock}</div>
          </div>
          <div className="FlexCol width2">
            <div className="Heading">Price</div>
            <div>&#8377;{totalPrice}</div>
          </div>
          <div className="FlexCol width3">
            <div className="Heading">Quantity</div>
            <QuantityControl productId={productId} quantity={quantity} />
          </div>
        </div>
      </div>
    )
  );
};

export default CartItem;
