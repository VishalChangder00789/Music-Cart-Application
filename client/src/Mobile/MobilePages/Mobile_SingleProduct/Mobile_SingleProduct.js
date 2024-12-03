import React, { useState, useEffect } from "react";
import "./Mobile_SingleProduct.css";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../../Controller/localStorageConnection";
import { getProductIdFromLocalStorage } from "../../../Controller/localStorageConnection";
import { CLIENT_PORT, LOGIN, PRODUCTS } from "../../../Constants/Client_Path";
import { useNavigate } from "react-router-dom";
import { getIdsFromLocalStorage } from "../../../Controller/localStorageConnection";
import { ADD_ITEM_TO_CART } from "../../../Constants/Server_Path";
import { VIEWCART } from "../../../Constants/Client_Path";

import { RiStarSFill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";

// Imports
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_BUTTON from "../../MobileComponents/_GLOBAL_MOBILE_BUTTON/_GLOBAL_MOBILE_BUTTON";
import _IMAGECAROUSAL_MOBILE from "../../MobileComponents/_IMAGECAROUSAL_MOBILE/_IMAGECAROUSAL_MOBILE";
import { DEPLOYED_BASE_URL } from "../../../Constants/Server_Path";

const Mobile_SingleProduct = ({}) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [moreDescription, setMoreDescription] = useState(false);

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

  const readCharacters = (about, shortenIt) => {
    let description = about;

    if (shortenIt) {
      description = "";
      for (let i = 0; i < 250; i++) {
        description += about[i];
      }
    }

    // Render Description
    let newDescription = [];
    newDescription = description.split("-");

    return newDescription;
  };

  useEffect(() => {
    if (!getTokenFromLocalStorage()) {
      navigate(LOGIN);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${DEPLOYED_BASE_URL}/_PRODUCTS/${getProductIdFromLocalStorage()}`,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        );

        setSelectedProduct(response.data.fetchedProduct);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StarRating = (rating) => {
    console.log(Math.floor(rating));
    const stars = [];

    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<RiStarSFill key={i} color="gold" />);
    }

    return stars;
  };

  const determineProductColor = (m) => {
    const productColor = m.toLowerCase();

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

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="">
      <_GLOBAL_MOBILE_HEADER ButtonActivation={true} pageToGo={PRODUCTS} />

      <div
        style={{
          fontFamily: "Poppins , sans-serif",
          fontWeight: "500",
          fontStyle: "normal",
        }}
        className="p-4"
      >
        <_IMAGECAROUSAL_MOBILE arrayImages={selectedProduct.imageURL} />

        <div className="mt-10 ">
          <div className="text-3xl font-semibold">
            {selectedProduct.codeName}
          </div>
          <div className="flex items-center">
            {selectedProduct.rating}
            <div className="ml-2 flex">
              {StarRating(selectedProduct.rating)}
            </div>
          </div>
          <div className="text-md mt-4">{selectedProduct.productName}</div>
          <div className="text-sm mt-4">Brand : {selectedProduct.brand}</div>

          <div
            className={`text-xl mt-4 ${determineProductColor(
              selectedProduct.color
            )}  w-3/6 p-2 text-white rounded-md flex items-center justify-center`}
          >
            {selectedProduct.color} | {selectedProduct.productType}
          </div>

          <div className="mt-4">
            <div className="text-xl font-bold">Description</div>
            {!moreDescription ? (
              <div className="mt-4 text-sm">
                {readCharacters(selectedProduct.about, true).map((string) => {
                  return (
                    <div className="flex mt-2 items-center">
                      <GoDotFill size={20} />
                      <div className="w-full ml-2">{string}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 text-sm">
                {readCharacters(selectedProduct.about, false).map((string) => {
                  return (
                    <div className="flex mt-2 items-center">
                      <GoDotFill size={20} />
                      <div className="w-full ml-2">{string}</div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-4 w-full flex justify-end items-end">
              <div
                onClick={() => setMoreDescription(!moreDescription)}
                className="w-1/6 p-2 rounded-sm text-white bg-blue-500 flex items-center justify-center"
              >
                {moreDescription ? "Less" : "More"}
              </div>
            </div>
          </div>

          <div className="_availabilityDetails">
            {selectedProduct.available ? (
              <div
                className={`border border-black w-3/12 justify-center items-center flex p-2 ${
                  selectedProduct.available ? "bg-green-400" : "bg-red-400"
                } text-xs`}
              >
                In-Stock
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-around items-center mt-8">
            <button
              className="rounded-sm p-3 w-5/12 text-black text-sm bg-[#FFC107]"
              onClick={() => handleAddToCart(selectedProduct._id)}
            >
              Add To Cart
            </button>
            <button
              className="rounded-sm p-3 w-5/12 text-black text-sm bg-[#FFC107]"
              onClick={() => handleBuyNow(selectedProduct._id)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* <_GLOBAL_MOBILE_FOOTER
        // FooterMessage="Musicart | All rights reserved"
        OptionFooter={true}
      /> */}
    </div>
  );
};

export default Mobile_SingleProduct;
