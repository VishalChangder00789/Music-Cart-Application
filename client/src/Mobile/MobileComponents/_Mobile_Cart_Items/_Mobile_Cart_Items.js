import React from "react";
import "./_Mobile_Cart_Items.css";

import QuantityControl from "../../../Components/QuantityControl/QuantityControl";

const _Mobile_Cart_Items = ({ item }) => {
  const productFeatures = item.details.fetchedProduct;
  const productDetails = item.quantity;
  const totalPrice = productFeatures.price * productDetails;

  return (
    <div className="w-full border border-black rounded-sm flex mt-4">
      <div className="bg-[#74747455] flex justify-center items-center p-4">
        <img className="shadow-md w-24 " src={productFeatures.imageURL[0]} />
      </div>

      <div className="ml-2">
        <div className="">
          <div className="font-bold">{productFeatures.codeName}</div>
          <div className="mt-2">{productFeatures.color}</div>
          {/* <div className="mt-2">{productFeatures.inStock}</div> */}
        </div>
        <div className="text-lg font-bold">
          <div>&#8377;{totalPrice}</div>
        </div>
        <div className="flex flex-col">
          <div className="">Quantity</div>
          <div className="mt-2 mb-2">
            <QuantityControl
              productId={productFeatures._id}
              quantity={productDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default _Mobile_Cart_Items;
