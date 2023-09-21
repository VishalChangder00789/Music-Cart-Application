import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { SINGLEPRODUCT } from "../../Constants/Client_Path";

const ProductCard = ({ product, showGrid, setSelectedProduct }) => {
  const navigate = useNavigate();

  const handleProductClick = (sentProduct) => {
    setSelectedProduct(sentProduct);
    navigate(SINGLEPRODUCT);
  };

  return (
    <div
      onClick={() => handleProductClick(product)}
      className={
        showGrid ? `ProductCardContainer-Grid` : `ProductCardContainer-List`
      }
    >
      <div className="">{product.title}</div>
    </div>
  );
};

export default ProductCard;
