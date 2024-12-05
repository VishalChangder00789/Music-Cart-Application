import React, { useState, useEffect } from "react";
import "./Mobile_Cart.css";
import axios from "axios";
import {
  DEPLOYED_BASE_URL,
  GET_USER_CART,
} from "../../../Constants/Server_Path";
import { useNavigate } from "react-router-dom";
import { getIdsFromLocalStorage } from "../../../Controller/localStorageConnection";
import { getTokenFromLocalStorage } from "../../../Controller/localStorageConnection";
import { GetPriceConvientFees } from "../../../Controller/Utilities";
import { GetTotalPrice } from "../../../Controller/Utilities";

// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_FOOTER from "../../MobileComponents/_GLOBAL_MOBILE_FOOTER/_GLOBAL_MOBILE_FOOTER";
import {
  CHECKOUT,
  CLIENT_PORT,
  SINGLEPRODUCT,
} from "../../../Constants/Client_Path";
import _GLOBAL_MOBILE_BUTTON from "../.././MobileComponents/_GLOBAL_MOBILE_BUTTON/_GLOBAL_MOBILE_BUTTON";
import CartItem from "../../../Components/CartItem/CartItem";
import _Mobile_Cart_Items from "../../MobileComponents/_Mobile_Cart_Items/_Mobile_Cart_Items";

const Mobile_Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handlePlaceOrderNavigation = () => {
    navigate("/checkout");
  };

  console.log(cartItems);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleCheckoutButton = () => {
    navigate(CHECKOUT);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins , sans-serif",
        fontWeight: "500",
        fontStyle: "normal",
      }}
      className=""
    >
      <_GLOBAL_MOBILE_HEADER ButtonActivation={true} pageToGo={SINGLEPRODUCT} />
      <div className="p-4 h-[550px]">
        {mergedData.map((item) => {
          return <_Mobile_Cart_Items item={item} />;
        })}
      </div>
      <div className="p-4 text-lg ">
        <div className="font-bold">Total Amount</div>
        <div>
          &#8377;{GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
        </div>
      </div>

      <div className="p-4">
        <button
          className="border w-full p-4 bg-[#ffc107]"
          onClick={handleCheckoutButton}
        >
          Place Order
        </button>
      </div>
      {/* <_GLOBAL_MOBILE_FOOTER OptionFooter={true} /> */}
    </div>
  );
};

export default Mobile_Cart;
