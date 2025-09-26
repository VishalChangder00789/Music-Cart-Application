import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { GET_USER_CART } from "../../Constants/Server_Path";
import { DEPLOYED_BASE_URL } from "../../Constants/Server_Path";
import { getTokenFromLocalStorage } from "../../Controller/localStorageConnection";

// Creating the CartContext
const CartContext = createContext();

// CartContextProvider component
const CartContextProvider = ({ children }) => {
  const [carts, setCartItems] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(null);

  useEffect(() => {
    let userCartId;
    if (localStorage.getItem("UserIds")) {
      userCartId = JSON.parse(localStorage.getItem("UserIds")).cartId;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(GET_USER_CART(userCartId));
        const cartItemsFromApi = response.data.UserCart.items;
        const totalCartItems = cartItemsFromApi.length;
        setCartItems(cartItemsFromApi);
        setTotalCartItems(totalCartItems);

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

    if (userCartId) {
      fetchData();
    }
  }, [carts, mergedData]);

  return (
    <CartContext.Provider
      value={{
        carts,
        setCartItems,
        mergedData,
        setMergedData,
        totalCartItems,
        setTotalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCartContext = () => {
  const context = useContext(CartContext);

  return context;
};

export { CartContextProvider, CartContext };
