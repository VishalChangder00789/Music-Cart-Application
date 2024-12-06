import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { SINGLEPRODUCT } from "../../Constants/Client_Path";
import { sendProductIdToLocalStorage } from "../../Controller/localStorageConnection";
import useProductColor from "../../CustomHooks/useProductColor";
import useScreenSize from "../../CustomHooks/useScreenSize";

const ProductCard = ({ product, showGrid, setSelectedProduct }) => {
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const productColorStyle = useProductColor(product.color);

  const handleProductClick = async (e, sentProduct) => {
    e.preventDefault();
    await setSelectedProduct(sentProduct);
    await sendProductIdToLocalStorage(sentProduct);
    navigate(SINGLEPRODUCT);
  };

  return (
    <div
      key={product._id}
      onClick={(e) => handleProductClick(e, product._id)}
      className={`cursor-pointer ${
        showGrid
          ? `bg-[#e6e6e6] rounded-sm lg:flex lg:flex-col lg:p-4 p-2 shadow-lg lg:h-96`
          : `border flex items-center mt-8 lg:p-2 lg:bg-[#e6e6e6] shadow-md`
      } `}
    >
      <div
        className={
          showGrid ? `lg:h-60 lg:w-full` : `border flex items-center w-1/10 `
        }
      >
        <img
          className={`${
            !showGrid ? `shadow-md shadow-[#414141ac] lg:h-40 lg:w-full` : ""
          }`}
          src={product.imageURL[0]}
        />
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
          <div className="bg-white lg:p-4 lg:h-full lg:w-[100%%] shadow-md shadow-[#787878]">
            <div className="text-lg font-semibold">{product.codeName}</div>
            <div className="">Price - &#8377; {product.price}</div>

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
