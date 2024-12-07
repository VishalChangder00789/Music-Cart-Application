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
    <div className="flex flex-col bg-white p-2 rounded-sm">
      <div className="text-sm font-semibold">{title}</div>
      <div className="w-full mt-2">
        {mergedData
          ? mergedData.map((item) => {
              return (
                <div className="border border-[#929292] lg:mt-4 lg:border-none lg:shadow-md shadow-[#6c6c6c56] mt-2 w-full min-h-24 max-h-40 flex items-center p-1 rounded-md lg:bg-[#a4a4a433]">
                  <div className="h-24 lg:h-28 w-[33%] lg:w-[20%] flex items-center p-1 bg-[#cecece]">
                    <img
                      className="h-full w-full shadow-md"
                      src={item.details.fetchedProduct.imageURL[0]}
                    />
                  </div>
                  <div className="ml-2 text-sm w-1/3 h-full">
                    <div className="">
                      {item.details.fetchedProduct.codeName}
                    </div>
                    <div className="text-xs font-semibold mt-1">
                      {item.details.fetchedProduct.color}
                    </div>
                  </div>
                  <div className="w-1/3 text-xs flex flex-col">
                    <div>Estimated delivery</div>
                    <div> Monday FREE </div>
                    <div>Standard Delivery</div>
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
