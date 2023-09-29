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

  // useEffect(() => {
  //   if (getTokenFromLocalStorage()) {
  //     axios
  //       .get(
  //         `http://localhost:8000/api/v1/_PRODUCTS/${getProductIdFromLocalStorage()}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getTokenFromLocalStorage()}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         setSelectedProduct(response.data.fetchedProduct);
  //         console.log(selectedProduct);
  //       })
  //       .catch((err) => {
  //         console.log("Error is : ", err);
  //       });
  //   } else {
  //     navigate(LOGIN);
  //   }
  // }, []);

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

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="_GLOBAL_MOBILE_HOLDER_ADJUSTED">
      <_GLOBAL_MOBILE_HEADER ButtonActivation={true} pageToGo={PRODUCTS} />

      <div className="SINGLE_PRODUCT_HOLDER_MOBILE_PARENT">
        <div className="SINGLE_PRODUCT_HOLDER_MOBILE">
          <_GLOBAL_MOBILE_BUTTON
            buttonTitle="Buy Now"
            buttonHeight="50px"
            buttonWidth="100%"
            background="#FFB800"
            fontColor="black"
            outline="none"
            borderRadius="7px"
            fontSize="18px"
            marginTop="7%"
            addFunctionality={() => handleBuyNow(selectedProduct._id)}
          />
          <_IMAGECAROUSAL_MOBILE arrayImages={selectedProduct.imageURL} />

          <div className="Details_SingleViewProduct">
            <div className="_productName">{selectedProduct.codeName}</div>
            <div className="_stars">{selectedProduct.rating}</div>
            <div className="_productFullName">
              {selectedProduct.productName}
            </div>

            <div className="_featureDetails">
              {selectedProduct.color} | {selectedProduct.productType}
            </div>

            <div className="_aboutProduct">{selectedProduct.about}</div>

            <div className="_availabilityDetails">
              {selectedProduct.available ? (
                <div className="_heading">Available : In-Stock</div>
              ) : (
                ""
              )}
            </div>

            <div className="_availabilityDetails">
              Brand : {selectedProduct.brand}
            </div>

            <div className="_buttonContainers">
              <button onClick={() => handleAddToCart(selectedProduct._id)}>
                Add To Cart
              </button>
              <button onClick={() => handleBuyNow(selectedProduct._id)}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <_GLOBAL_MOBILE_FOOTER
        // FooterMessage="Musicart | All rights reserved"
        OptionFooter={true}
      />
    </div>
  );
};

export default Mobile_SingleProduct;
