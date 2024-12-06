import React, { useState, useEffect } from "react";
import "./Mobile_Checkout.css";
import axios from "axios";
import { GET_USER_CART } from "../../../Constants/Server_Path";
import { getIdsFromLocalStorage } from "../../../Controller/localStorageConnection";
import { getTokenFromLocalStorage } from "../../../Controller/localStorageConnection";
import { GetPriceConvientFees } from "../../../Controller/Utilities";
import { GetTotalPrice } from "../../../Controller/Utilities";

// Files
import _GLOBAL_MOBILE_HEADER from "../../MobileComponents/_GLOBAL_MOBILE_HEADER/_GLOBAL_MOBILE_HEADER";
import _GLOBAL_MOBILE_BUTTON from "../../MobileComponents/_GLOBAL_MOBILE_BUTTON/_GLOBAL_MOBILE_BUTTON";
import _Mobile_Checkout_Items from "../../MobileComponents/_Mobile_Checkout_Items/_Mobile_Checkout_Items";
import { CLIENT_PORT, VIEWCART } from "../../../Constants/Client_Path";
import { useNavigate } from "react-router-dom";
import { DEPLOYED_BASE_URL } from "../../../Constants/Server_Path";
import DropdownSelectable from "../../MobileComponents/Dropdown-Selectable/Dropdown-Selectable";

const Mobile_Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [Loding, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (Loding) return <div>Loading ...</div>;

  const handleThankyouPage = () => {
    navigate("/thankyou");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins , sans-serif",
        fontStyle: "normal",
      }}
      className="bg-white"
    >
      <_GLOBAL_MOBILE_HEADER
        //HeaderMessage="WELCOME"
        //SearchActive={true}
        ButtonActivation={true}
        pageToGo={VIEWCART}
      />

      <div className="pl-2 flex mt-4">
        <div className="text-black flex items-center text-md ">Subtotal</div>
        <div className="flex ml-4 justify-center">
          <div>&#8377;</div>
          <div className="ml-1 text-2xl font-semibold">
            {GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
          </div>
        </div>
      </div>
      <div className="pl-2 text-blue-500">EMI Available Details</div>

      <div className="flex justify-center">
        <_GLOBAL_MOBILE_BUTTON
          buttonTitle="Proceed to Buy"
          buttonHeight="50px"
          buttonWidth="90%"
          background="#FFB800"
          fontColor="black"
          outline="none"
          borderRadius="7px"
          fontSize="16px"
          marginTop="5%"
          addFunctionality={handleThankyouPage}
        />
      </div>

      <div className="p-2 mt-4">
        <div className="text-lg font-semibold">Delivery Address</div>
        <div className="mt-2">
          <DropdownSelectable />
        </div>
      </div>

      <div className="_Mobile_Checkout_Comp1">
        <div className="_MobileHeading">2. Payment method</div>
        <div className="_mob">
          Akash Patel 104 kk hh nagar, Lucknow Uttar Pradesh 226025
        </div>
      </div>

      <div className="p-2 mt-4">
        <div className="text-lg font-semibold">Review items and delivery</div>
        <div className="flex flex-col">
          {mergedData.map((item) => {
            return <_Mobile_Checkout_Items item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Mobile_Checkout;
