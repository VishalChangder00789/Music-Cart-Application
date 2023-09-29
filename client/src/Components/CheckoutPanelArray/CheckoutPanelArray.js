import React, { useEffect, useState } from "react";
import "./CheckoutPanelArray.css";
import axios from "axios";
import {
  DEPLOYED_BASE_URL,
  GET_USER_CART,
  SERVER_BASEURL,
} from "../../Constants/Server_Path";
import {
  getIdsFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Controller/localStorageConnection";
import { PRODUCTS } from "../../Constants/Client_Path";

//Files

const CheckoutPanelArray = ({ title, Details }) => {
  const [cartItems, setCartItems] = useState([]);
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          GET_USER_CART(JSON.parse(getIdsFromLocalStorage()).cartId)
        );

        const cartItemsFromApi = response.data.UserCart.items;
        setCartItems(cartItemsFromApi);

        const productDetailRequests = cartItemsFromApi.map((item) =>
          axios.get(`${DEPLOYED_BASE_URL}/_PRODUCTS/${item.product}`, {
            headers: {
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          })
        );

        const productDetailResponses = await axios.all(productDetailRequests);

        const mergedData = cartItemsFromApi.map((cartItem, index) => ({
          ...cartItem,
          details: productDetailResponses[index].data,
        }));

        setMergedData(mergedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="CheckoutPanelArrayContainer">
      <div className="CheckoutPanelArrayContainer_Title">{title}</div>
      <div className="CheckoutPanelArrayContainer_Details">
        {mergedData
          ? mergedData.map((item) => {
              return (
                <div className="CheckoutItemHolder">
                  <div className="CheckoutItemHolder_ImageHolder">
                    <img src={item.details.fetchedProduct.imageURL[0]} />
                  </div>
                  <div className="CheckoutItemHolder_Details Heading">
                    {item.details.fetchedProduct.codeName}
                  </div>
                  <div className="CheckoutItemHolder_Details">
                    Colour : {item.details.fetchedProduct.color}
                  </div>
                  <div className="CheckoutItemHolder_Details">
                    Estimated delivery : Monday — FREE Standard Delivery
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default CheckoutPanelArray;
