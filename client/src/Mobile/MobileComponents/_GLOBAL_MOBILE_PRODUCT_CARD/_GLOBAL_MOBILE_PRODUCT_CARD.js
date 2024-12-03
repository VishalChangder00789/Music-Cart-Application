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

  const determineProductColor = () => {
    const productColor = product.color.toLowerCase();

    if (productColor === "white") {
      return "bg-white";
    }

    if (productColor === "black") {
      return "bg-black";
    }

    if (productColor === "silver") {
      return "bg-gray-300";
    }

    if (productColor === "grey") {
      return "bg-gray-500";
    }

    return `bg-${productColor}-500`;
  };

  return (
    <div
      style={{
        fontFamily: "Poppins , sans-serif",
        fontWeight: "500",
        fontStyle: "normal",
      }}
      onClick={(e) => handleProductClick(e, product._id)}
      // className="_GLOBAL_MOBILE_PRODUCT_CARD"
      className="shadow-md p-2 bg-[#eaeaea] border-1 h-72"
    >
      <div className="flex flex-col justify-around">
        <img src={product.imageURL[0]} className="h-30 w-full shadow-md" />
        <div className="min-h-32 text-xs mt-2 flex flex-col justify-around">
          <div className="text-lg font-bold">&#8377;{product.price}</div>
          <div className="text-[14px] font-medium">{product.codeName}</div>
          <div className="_mobileDisplayName">
            <div
              className={`${determineProductColor()} border border-black  rounded-[50%] h-4 w-4 p-2 mt-1`}
            ></div>
            <div className="mt-2">{product.productType.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default _GLOBAL_MOBILE_PRODUCT_CARD;
