import React from "react";
import { useNavigate } from "react-router-dom";
import { SINGLEPRODUCT } from "../../Constants/Client_Path";
import { sendProductIdToLocalStorage } from "../../Controller/localStorageConnection";
import useProductColor from "../../CustomHooks/useProductColor";
import useScreenSize from "../../CustomHooks/useScreenSize";
import { useNightModeContext } from "../../Contexts/OtherCommonContext/NightModeContext";

const ProductCard = ({ product, showGrid }) => {
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const productColorStyle = useProductColor(product.color);
  const { isNightMode } = useNightModeContext();

  const handleProductClick = async (e, sentProduct) => {
    e.preventDefault();
    // await setSelectedProduct(sentProduct);
    // await sendProductIdToLocalStorage(sentProduct);
    navigate(`/product/${sentProduct}`);
  };

  return (
    <div
      key={product._id}
      onClick={(e) => handleProductClick(e, product._id)}
      className={`cursor-pointer ${
        showGrid
          ? `rounded-sm p-2 h-72 lg:p-4 shadow-lg lg:h-96 ${
              isNightMode ? "bg-[#4a374f] rounded-[14px]" : "bg-gray-200"
            }`
          : `flex items-center mt-8 p-2 shadow-md`
      }`}
    >
      <div
        className={showGrid ? `lg:h-60 lg:w-full` : `flex items-center w-1/10`}
      >
        <div
          className={`${isNightMode ? `bg-[#ffffffba] rounded-2xl` : ``} p-1`}
        >
          <img
            className={`${!showGrid ? `rounded-2xl lg:h-40 lg:w-full` : ""} ${
              isNightMode
                ? "filter brightness-100 contrast-100 mix-blend-multiply"
                : ""
            }`}
            style={{ background: "transparent" }}
            src={product.imageURL[0]}
            alt={product.codeName}
          />
        </div>
      </div>
      <div className={showGrid ? `mt-4` : `lg:h-40 lg:w-[100%] lg:ml-2`}>
        {showGrid ? (
          <div className="flex flex-col justify-between min-h-10">
            <div className="flex">
              <div>&#8377;</div>
              <div className="text-xl font-bold">{product.price}</div>
            </div>
            <div className="font-semibold text-sm">{product.codeName}</div>
            {width < 768 ? (
              <div className="flex p-1 text-xs flex-col">
                <div
                  style={productColorStyle}
                  className="w-4 h-4 flex justify-center items-center rounded-[50%]"
                ></div>
                <div className="font-semibold mt-2">
                  {product.productType.toUpperCase()}
                </div>
              </div>
            ) : (
              <div style={productColorStyle} className="flex p-1 mt-2 text-xs">
                {product.color} | {product.productType.toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`${
              isNightMode ? "bg-[#5d5d5d36]" : "bg-white"
            } lg:p-4 lg:h-full lg:w-[100%]`}
          >
            <div className="text-lg font-semibold">{product.codeName}</div>
            <div>Price - &#8377; {product.price}</div>

            <div className="text-semibold">{product.productName}</div>
            {width < 768 ? (
              "sdad"
            ) : (
              <div style={productColorStyle} className="pl-2 text-xs p-1 mt-2">
                {product.color} | {product.productType.toUpperCase()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
