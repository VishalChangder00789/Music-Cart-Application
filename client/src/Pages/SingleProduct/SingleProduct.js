import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import Banner from "../../Components/Banner/Banner";
import Button from "../../Components/Buttons/Button";
import Footer from "../../Components/Footer/Footer";
import { GoDotFill } from "react-icons/go";

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
import useProductColor from "../../CustomHooks/useProductColor";
import {
  CLIENT_PORT,
  LOGIN,
  PRODUCTS,
  VIEWCART,
} from "../../Constants/Client_Path";
import { RiStarSFill } from "react-icons/ri";

import { DEPLOYED_BASE_URL } from "../../Constants/Server_Path";
import useScreenSize from "../../CustomHooks/useScreenSize";
import _IMAGECAROUSAL_MOBILE from "../../Components/_IMAGECAROUSAL_MOBILE/_IMAGECAROUSAL_MOBILE";

const SingleProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [moreDescription, setMoreDescription] = useState(false);
  const { width } = useScreenSize();

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      axios
        .get(
          `${DEPLOYED_BASE_URL}/_PRODUCTS/${getProductIdFromLocalStorage()}`,
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

  const getProductColorStyle = (color) => {
    const lightColors = ["white", "silver", "yellow"];
    return {
      backgroundColor: color.toLowerCase(),
      color: lightColors.includes(color.toLowerCase()) ? "black" : "white",
    };
  };

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

  const StarRating = (rating) => {
    return Array.from({ length: Math.floor(rating) }, (_, i) => (
      <RiStarSFill key={i} color="gold" size={20} />
    ));
  };

  const readCharacters = (about, shortenIt) => {
    const description = shortenIt ? about.slice(0, 250) : about;
    return description.split("-").map((str) => str.trim());
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
    <div className="flex flex-col">
      <Banner />
      <div className="lg:min-h-[450px] lg:p-8 p-4 pb-10">
        {selectedProduct ? (
          <div className="lg:flex lg:flex-row flex-col">
            {width > 768 ? (
              <div className="flex w-4/12 relative">
                <ImageCarousal
                  arrayOfImageUrl={[...selectedProduct.imageURL]}
                />
              </div>
            ) : (
              <_IMAGECAROUSAL_MOBILE arrayImages={selectedProduct.imageURL} />
            )}

            <div className="lg:pl-8 lg:w-8/12 lg:flex-col lg:mt-0 mt-8">
              {width < 768 ? (
                <div className="text-2xl font-semibold">
                  {selectedProduct.codeName}
                </div>
              ) : (
                <div className="text-2xl font-semibold">
                  {selectedProduct.productName}
                </div>
              )}

              <div className="mt-2">
                {width > 768 && (
                  <div className="text-[#071ef3fa] hover:underline cursor-pointer">
                    {selectedProduct.codeName}
                  </div>
                )}

                <div className="mt-2 flex items-center">
                  <div className="font-bold items-center flex">
                    {Number.isInteger(selectedProduct.rating)
                      ? selectedProduct.rating + ".0"
                      : selectedProduct.rating}
                  </div>
                  <div className="flex ml-2 items-center">
                    {StarRating(selectedProduct.rating)}
                  </div>
                </div>
                <div className="flex mt-2">
                  <div>&#8377;</div>
                  <div className="text-2xl font-semibold">
                    {selectedProduct.price}
                  </div>
                </div>
                <div
                  style={getProductColorStyle(
                    selectedProduct.color.toLowerCase()
                  )}
                  className="p-2 lg:mt-2 mt-4 lg:w-full w-6/12 rounded-lg text-sm"
                >
                  {selectedProduct.color} |{" "}
                  {selectedProduct.productType.toUpperCase()}
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold">Description</h2>
                  <div className="mt-4 text-sm">
                    {readCharacters(
                      selectedProduct.about,
                      !moreDescription
                    ).map((string, index) => (
                      <div key={index} className="flex mt-2 items-center">
                        <GoDotFill
                          size={20}
                          className="w-[20px] flex items-center"
                        />
                        <p className="ml-2 w-full">{string}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 w-full flex justify-end">
                    <button
                      onClick={() => setMoreDescription(!moreDescription)}
                      className="w-1/6 p-2 rounded-sm text-white bg-blue-500"
                    >
                      {moreDescription ? "Less" : "More"}
                    </button>
                  </div>
                </div>

                {width < 768 ? (
                  ""
                ) : (
                  <div
                    style={getProductColorStyle(
                      selectedProduct.color.toLowerCase()
                    )}
                    className="font-semibold text-xl mt-2 min-w-1/12 max-w-[150px] flex items-center justify-center p-2 rounded-lg"
                  >
                    <div>{selectedProduct.brand}</div>
                  </div>
                )}

                {/* ADD ITEMS TO THE CART */}
                <div className="lg:h-12 lg:mt-24 lg:w-1/3 flex lg:justify-around lg:items-center mt-10 justify-around h-12 ">
                  <button
                    className="w-[45%]  lg:h-full bg-[#ffd600] font-semibold text-sm rounded-sm "
                    onClick={() => handleAddToCart(selectedProduct._id)}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="w-[45%]  lg:h-full bg-[#ffd600] font-semibold text-sm rounded-sm "
                    onClick={() => handleBuyNow(selectedProduct._id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="p-8">
        <div className="border-t pt-2">Reviews</div>
      </div>
    </div>
  );
};

export default SingleProduct;
