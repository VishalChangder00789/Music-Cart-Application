import React, { useState, useEffect, useCallback } from "react";
import "./Mobile_SingleProduct.css";
import axios from "axios";
import {
  getTokenFromLocalStorage,
  getProductIdFromLocalStorage,
  getIdsFromLocalStorage,
} from "../../../Controller/localStorageConnection";
import {
  CLIENT_PORT,
  LOGIN,
  PRODUCTS,
  VIEWCART,
} from "../../../Constants/Client_Path";
import {
  ADD_ITEM_TO_CART,
  DEPLOYED_BASE_URL,
} from "../../../Constants/Server_Path";
import { useNavigate } from "react-router-dom";

import { RiStarSFill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";

// Imports
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import _GLOBAL_MOBILE_BUTTON from "../../MobileComponents/_GLOBAL_MOBILE_BUTTON/_GLOBAL_MOBILE_BUTTON";
// import _IMAGECAROUSAL_MOBILE from "../../MobileComponents/_IMAGECAROUSAL_MOBILE/_IMAGECAROUSAL_MOBILE";

const Mobile_SingleProduct = ({}) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moreDescription, setMoreDescription] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Product Data with Error Handling
  useEffect(() => {
    if (!getTokenFromLocalStorage()) navigate(LOGIN);

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
      } catch (error) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Add to Cart Handler with Feedback
  const handleAddToCart = useCallback(async (productId) => {
    try {
      const userId = JSON.parse(getIdsFromLocalStorage()).userId;
      const apiPath = ADD_ITEM_TO_CART(userId, productId);
      await axios.post(apiPath);
      alert("Product added to cart successfully.");
    } catch (error) {
      setError("Error adding to cart. Please try again.");
    }
  }, []);

  // Buy Now Handler with Feedback
  const handleBuyNow = useCallback(
    async (productId) => {
      try {
        const userId = JSON.parse(getIdsFromLocalStorage()).userId;
        const apiPath = ADD_ITEM_TO_CART(userId, productId);
        await axios.post(apiPath);
        navigate(VIEWCART);
      } catch (error) {
        setError("Error purchasing product. Please try again.");
      }
    },
    [navigate]
  );

  // Truncate and Format Description
  const readCharacters = (about, shortenIt) => {
    const description = shortenIt ? about.slice(0, 250) : about;
    return description.split("-").map((str) => str.trim());
  };

  // Star Rating Component
  const StarRating = (rating) => {
    return Array.from({ length: Math.floor(rating) }, (_, i) => (
      <RiStarSFill key={i} color="gold" />
    ));
  };

  // Determine Background and Text Color
  const getProductColorStyle = (color) => {
    const lightColors = ["white", "silver", "yellow"];
    return {
      backgroundColor: color.toLowerCase(),
      color: lightColors.includes(color.toLowerCase()) ? "black" : "white",
    };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <_GLOBAL_MOBILE_HEADER ButtonActivation={true} pageToGo={PRODUCTS} />
      <div
        style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500" }}
        className="p-4"
      >
        {/* <_IMAGECAROUSAL_MOBILE arrayImages={selectedProduct.imageURL} /> */}
        <div className="mt-10">
          <h1 className="text-3xl font-semibold">{selectedProduct.codeName}</h1>
          <div className="flex items-center mt-2">
            {selectedProduct.rating}
            <div className="ml-2 flex items-center">
              {StarRating(selectedProduct.rating)}
            </div>
          </div>
          <div className="text-md mt-4">{selectedProduct.productName}</div>
          <div className="text-sm mt-4">Brand: {selectedProduct.brand}</div>

          <div
            className="text-sm mt-4 w-3/6 p-2 rounded-md flex items-center pl-3 border"
            style={getProductColorStyle(selectedProduct.color)}
          >
            {selectedProduct.color} | {selectedProduct.productType}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">Description</h2>
            <div className="mt-4 text-sm border">
              {readCharacters(selectedProduct.about, !moreDescription).map(
                (string, index) => (
                  <div key={index} className="flex mt-2 items-center border ">
                    <GoDotFill size={20} className="w-1/3 border" />
                    <p className="ml-2 w-2/3">{string}</p>
                  </div>
                )
              )}
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

          <div className="_availabilityDetails">
            {selectedProduct.available && (
              <div className="bg-green-400 text-xs border border-black p-2 w-3/12 text-center">
                In Stock
              </div>
            )}
          </div>

          <div className="flex justify-around mt-8">
            <button
              className="rounded-sm p-3 w-5/12 bg-[#FFC107] text-black text-sm"
              onClick={() => handleAddToCart(selectedProduct._id)}
            >
              Add To Cart
            </button>
            <button
              className="rounded-sm p-3 w-5/12 bg-[#FFC107] text-black text-sm"
              onClick={() => handleBuyNow(selectedProduct._id)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile_SingleProduct;
