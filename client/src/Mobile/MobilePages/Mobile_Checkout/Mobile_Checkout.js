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
import { VIEWCART } from "../../../Constants/Client_Path";
import { useNavigate } from "react-router-dom";

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
          axios.get(`http://localhost:8000/api/v1/_PRODUCTS/${item.product}`, {
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
    <div className="_GLOBAL_MOBILE_HOLDER_ADJUSTED">
      <_GLOBAL_MOBILE_HEADER
        //HeaderMessage="WELCOME"
        //SearchActive={true}
        ButtonActivation={true}
        pageToGo={VIEWCART}
      />

      <div className="_Mobile_Checkout_Header_Message">Checkout</div>

      <div className="_Mobile_Checkout_Comp1">
        <div className="_MobileHeading">1. Delivery Address</div>
        <div className="_mob">
          Akash Patel 104 kk hh nagar, Lucknow Uttar Pradesh 226025
        </div>
      </div>

      <div className="_Mobile_Checkout_Comp1">
        <div className="_MobileHeading">2. Payment method</div>
        <div className="_mob">
          Akash Patel 104 kk hh nagar, Lucknow Uttar Pradesh 226025
        </div>
      </div>

      <div className="_Mobile_Checkout_Comp1">
        <div className="_MobileHeading">3. Review items and delivery</div>
        <div className="ProductCatalogue">
          {mergedData.map((item) => {
            return <_Mobile_Checkout_Items item={item} />;
          })}
        </div>
      </div>

      <div className="_Mobile_Checkout_Comp2">
        <div className="_SumPaymentHeading">Order Total : </div>
        <div className="_SumPaymentHeading_sub">
          &#8377;{GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
        </div>
      </div>

      <div className="_Mobile_Checkout_Comp5">
        <_GLOBAL_MOBILE_BUTTON
          buttonTitle="Place your Order"
          buttonHeight="50px"
          buttonWidth="80%"
          background="#FFB800"
          fontColor="black"
          outline="none"
          borderRadius="7px"
          fontSize="18px"
          marginTop="7%"
          addFunctionality={handleThankyouPage}
        />
      </div>
    </div>
  );
};

export default Mobile_Checkout;
