import React, { useEffect, useState } from "react";
import "./Checkout.css";
import axios from "axios";
import { GET_USER_CART } from "../../Constants/Server_Path";
import {
  getIdsFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Controller/localStorageConnection";
import { CLIENT_PORT, PRODUCTS } from "../../Constants/Client_Path";

// Files
import Banner from "../../Components/Banner/Banner";
import CheckoutPanel from "../../Components/CheckoutPanel/CheckoutPanel";
import CheckoutPanelArray from "../../Components/CheckoutPanelArray/CheckoutPanelArray";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { DEPLOYED_BASE_URL } from "../../Constants/Server_Path";
import {
  GetPriceConvientFees,
  GetTotalPrice,
} from "../../Controller/Utilities";

const Checkout = () => {
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

  const navigate = useNavigate();
  const handlePlaceOrderNavigationCheckout = () => {
    navigate("/thankyou");
  };

  return (
    <div className="flex flex-col bg-[#ebebebdc] lg:bg-white">
      <Banner
        showAdBanner={false}
        productPath="Checkout"
        showClassifiedButton={true}
        navigationRoute={PRODUCTS}
        BannerContainerWidth="100%"
        LogoContainerWidth="40%"
        LogoContainerHeight="40pX"
        LogoWidth="30%"
        LogoHeigth="35px"
      />

      <div className="flex p-4 flex-col">
        <div className="text-sm font-semibold p-1 lg:p-2">Checkout</div>
        <div className="flex lg:flex-row flex-col lg:justify-evenly lg:p-4 lg:bg-[#f6f6f6]">
          <div className="w-full lg:w-[45%] mt-2 lg:mt-0">
            <CheckoutPanel
              title="Delivery Address"
              Details="Akash Patel 104 kk hh nagar, Lucknow,Uttar Pradesh 226025"
            />
            <div className="mt-2">
              <CheckoutPanel
                title="Payment method"
                Details="Pay on delivery ( Cash/Card)"
                dropdown
              />
            </div>
            <div className="mt-2">
              <CheckoutPanelArray title="Review items and delivery" />
            </div>
          </div>

          <div className="w-full lg:w-[45%] flex items-center justify-center mt-4 lg:mt-0 p-2 bg-white lg:bg-none border rounded-sm">
            <div className="flex justify-center items-center flex-col border p-4 rounded-lg bg-[#dedede2c] shadow-md">
              <button
                onClick={handlePlaceOrderNavigationCheckout}
                className="w-full border p-4 rounded-md bg-[#ffd600] text-md font-semibold"
              >
                Place your order
              </button>

              <div className="Information">
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </div>

              <div className="MainDetails">
                <div className="Heading">Order Summary</div>
                <div className="PriceDetails">
                  <div className="PriceDetaisItems">
                    <div>Items : </div>
                    <div>{mergedData.length}</div>
                  </div>
                  <div className="PriceDetaisItems">
                    <div>Delivery : </div>
                    <div>&#8377;{0}</div>
                  </div>
                </div>
              </div>

              <div className="OrderTotal">
                <div>Order Total : </div>
                <div className="flex">
                  <div className="text-sm"></div>&#8377;
                  <div className="text-xl">
                    {GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
