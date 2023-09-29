import React from "react";
import "./_Mobile_Checkout_Items.css";

const _Mobile_Checkout_Items = ({ item }) => {
  const productFeatures = item.details.fetchedProduct;
  const productQuantity = item.quantity;
  const totalPrice = productFeatures.price * productQuantity;

  return (
    <div className="_Mobile_Checkout_Items_Container">
      <img src={productFeatures.imageURL[0]} />
      <div className="_Mobile_Checkout_Items_Container_Details">
        <div className="_Mobile_Checkout_Items_Container_Details-Name">
          {productFeatures.codeName}
        </div>
        <div className="_Mobile_Checkout_Items_Container_Details-Color">
          Color : {productFeatures.color}
        </div>
        <div className="_Mobile_Checkout_Items_Container_Details-Color">
          {productFeatures.available ? `In Stock` : ""}
        </div>
        <div className="_Mobile_Checkout_Items_Container_Details_Lastitem">
          Estimated delivery : Monday — FREE Standard Delivery
        </div>
      </div>
    </div>
  );
};

export default _Mobile_Checkout_Items;
