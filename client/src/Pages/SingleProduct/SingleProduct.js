import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import ProductSuperHeader from "../../Components/ProductHeader/ProductSuperHeader";
import Banner from "../../Components/Banner/Banner";
import Button from "../../Components/Buttons/Button";
import Footer from "../../Components/Footer/Footer";
import axios, { Axios } from "axios";
import { GET_PRODUCT_BY_ID } from "../../Constants/Server_Path";
import {
  getProductIdFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Controller/localStorageConnection";
import ImageCarousal from "../../Components/ImageCarousal/ImageCarousal";
import Stars from "../../Components/Stars/Stars";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../Constants/Client_Path";

const SingleProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/_PRODUCTS/${getProductIdFromLocalStorage()}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGMzNzUzMDUwNzg4NmI2Y2ZlNjAzYiIsImlhdCI6MTY5NTQwODQwNywiZXhwIjoxNzAzMTg0NDA3fQ.d5btwW-Vbei8MN7GkG-YAk1_-B9PhuNBmkfE7Wc2NIs `,
          },
        }
      )
      .then((response) => {
        setSelectedProduct(response.data.fetchedProduct);
      })
      .catch((err) => {
        console.log("Error is : ", err);
      });
  }, []);

  useEffect(() => {
    console.log(selectedProduct.rating);
  });

  const navigate = useNavigate();

  return (
    <div className="_GLOBAL_PAGE_INNER_HOLDER_NOSPACING">
      <ProductSuperHeader
        ContainerHeight="30px"
        ContainerWidth="100%"
        PhoneNumber="912121131313"
        MiddleMessage="Get 50% off on selected items | Shop Now"
        BackgroundColor="#2E0052"
        ImageHeight="80%"
        ImageWidth="20%"
      />
      <Banner
        showAdBanner={false}
        productPath={selectedProduct.codeName}
        showClassifiedButton={true}
        navigationRoute={PRODUCTS}
        BannerContainerWidth="75%"
        LogoContainerWidth="45%"
        LogoContainerHeight="40pX"
        LogoWidth="30%"
        LogoHeigth="35px"
      />
      <div className="ProductDetails">
        {selectedProduct ? (
          <>
            <div className="ProductName">{selectedProduct.productName}</div>
            <div className="SingleProductDetailsContainer">
              <div className="Images">
                <ImageCarousal
                  arrayOfImageUrl={[...selectedProduct.imageURL]}
                />
              </div>
              <div className="Text">
                <div className="ProductName">{selectedProduct.codeName}</div>
                <div className="Stars">
                  <Stars rating={selectedProduct.rating} />
                </div>
                <div className="SingleProductSeperatedContainer">
                  Price - &#8377; {selectedProduct.price}
                </div>
                <div className="SingleProductSeperatedContainer">
                  {selectedProduct.color} |{" "}
                  {selectedProduct.productType.toUpperCase()}
                </div>
                <div className="SingleProductSeperatedContainer para">
                  <span>About this items</span>
                  <div className="Paragraph">{selectedProduct.about}</div>
                </div>
                <div className="SingleProductSeperatedContainer Horizontal">
                  <span>Available - </span>
                  <div>
                    {selectedProduct.available ? "In-Stock" : "Out-of-Stock"}
                  </div>
                </div>
                <div className="SingleProductSeperatedContainer Horizontal">
                  <span>Brand - </span>
                  <div>{selectedProduct.brand}</div>
                </div>

                <div className="SingleProductSeperatedContainer Vertical">
                  <button>Add To Cart</button>
                  <button>Buy Now</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <Footer
        ContainerHeight="40px"
        ContainerWidth="100%"
        FooterMessage="Musicart | All rights reserved"
        FooterBackground="
        #2E0052"
      />
    </div>
  );
};

export default SingleProduct;
