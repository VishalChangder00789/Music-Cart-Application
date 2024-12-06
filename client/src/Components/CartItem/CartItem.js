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
      <div
        key={CartItem._id}
        className="flex items-center border mt-4 p-2 lg:bg-[#f6f6f6] bg-white"
      >
        <div className="items-center w-[25%] h-full flex">
          <img
            className="h-full w-full lg:shadow-lg items-center"
            src={singleProduct.details.fetchedProduct.imageURL[0]}
          />
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
          <div className="flex lg:flex-col flex-col justify-between items-center lg:mr-4">
            <div className="w-full font-bold">Quantity</div>
            <div className="lg:w-full w-2/3 min-h-32 mt-2 flex lg:justify-start lg:items-start justify-center items-center">
              <QuantityControl productId={productId} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CartItem;
