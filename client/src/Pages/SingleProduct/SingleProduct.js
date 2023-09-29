import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import ProductSuperHeader from "../../Components/ProductSuperHeader/ProductSuperHeader";
import Banner from "../../Components/Banner/Banner";
import Button from "../../Components/Buttons/Button";
import Footer from "../../Components/Footer/Footer";
import axios, { Axios } from "axios";
import {
  ADD_ITEM_TO_CART,
  GET_PRODUCT_BY_ID,
} from "../../Constants/Server_Path";
import {
  getIdsFromLocalStorage,
  getProductIdFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Controller/localStorageConnection";
import ImageCarousal from "../../Components/ImageCarousal/ImageCarousal";
import Stars from "../../Components/Stars/Stars";
import { useNavigate } from "react-router-dom";
import {
  CLIENT_PORT,
  LOGIN,
  PRODUCTS,
  VIEWCART,
} from "../../Constants/Client_Path";

const SingleProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      axios
        .get(
          `http://localhost:${CLIENT_PORT}/api/v1/_PRODUCTS/${getProductIdFromLocalStorage()}`,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        )
        .then((response) => {
          setSelectedProduct(response.data.fetchedProduct);
        })
        .catch((err) => {
          console.log("Error is : ", err);
        });
    } else {
      navigate(LOGIN);
    }
  }, []);

  useEffect(() => {
    console.log(selectedProduct.rating);
  });

  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    // Only add the item to the cart
    const userId = JSON.parse(getIdsFromLocalStorage()).userId;
    const apiPath = ADD_ITEM_TO_CART(userId, productId);
    const apiUrl = await axios
      .post(apiPath)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBuyNow = async (productId) => {
    // add the item to the cart and navigate to cart
    const userId = JSON.parse(getIdsFromLocalStorage()).userId;
    const apiPath = ADD_ITEM_TO_CART(userId, productId);
    const apiUrl = await axios
      .post(apiPath)
      .then((response) => {
        console.log(response);
        navigate(VIEWCART);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                {/* ADD ITEMS TO THE CART */}
                <div className="SingleProductSeperatedContainer Vertical">
                  <button onClick={() => handleAddToCart(selectedProduct._id)}>
                    Add To Cart
                  </button>
                  <button onClick={() => handleBuyNow(selectedProduct._id)}>
                    Buy Now
                  </button>
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
