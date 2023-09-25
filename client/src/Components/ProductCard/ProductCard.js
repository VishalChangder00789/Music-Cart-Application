import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { SINGLEPRODUCT } from "../../Constants/Client_Path";
import { sendProductIdToLocalStorage } from "../../Controller/localStorageConnection";

const ProductCard = ({ product, showGrid, setSelectedProduct }) => {
  const navigate = useNavigate();

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
      className={
        showGrid ? `ProductCardContainer-Grid` : `ProductCardContainer-List`
      }
    >
      <div className={showGrid ? `ImageContainer` : `ImageContainer-List`}>
        <img src={product.imageURL[0]} />
      </div>
      <div
        className={
          showGrid ? `ProductDetailsContainer` : `ProductDetailsContainer-List`
        }
      >
        {showGrid ? (
          <>
            <span>{product.codeName}</span>
            <span>Price - &#8377; {product.price}</span>
            <span>
              {product.color} | {product.productType.toUpperCase()}
            </span>
          </>
        ) : (
          <div className="List_Product_Detail">
            <span className="Heading ListProductDetailHeading">
              {product.codeName}
            </span>
            <span className="ListProductDetail_Subheading">
              Price - &#8377; {product.price}
            </span>
            <span className="ListProductDetail_Subheading">
              {product.color} | {product.productType.toUpperCase()}
            </span>
            <span className="ListProductDetail_Subheading">
              {product.productName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
