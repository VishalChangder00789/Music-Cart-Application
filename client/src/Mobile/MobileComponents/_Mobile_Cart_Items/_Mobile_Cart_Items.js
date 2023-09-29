import React from "react";
import "./_Mobile_Cart_Items.css";

import QuantityControl from "../../../Components/QuantityControl/QuantityControl";

const _Mobile_Cart_Items = ({ item }) => {
  const productFeatures = item.details.fetchedProduct;
  const productDetails = item.quantity;
  const totalPrice = productFeatures.price * productDetails;

  return (
    <div className="_Mobile_CartItem_Unique">
      <div className="_Mobile_CartItemImageContainer">
        <img src={productFeatures.imageURL[0]} />
      </div>
      <div className="_Mobile_CartItemDetails">
        <div className="_Mobile_FlexCol width1">
          <div className="_Mobile_Heading">{productFeatures.codeName}</div>
          <div>{productFeatures.color}</div>
          <div>{productFeatures.inStock}</div>
        </div>
        <div className="_Mobile_FlexCol _mobile_width2">
          <div className="_Mobile_Heading">Price</div>
          <div>&#8377;{totalPrice}</div>
        </div>
        <div className="_Mobile_FlexCol _mobile_width3">
          <div className="_Mobile_Heading">Quantity</div>
          <QuantityControl
            productId={productFeatures._id}
            quantity={productDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default _Mobile_Cart_Items;
