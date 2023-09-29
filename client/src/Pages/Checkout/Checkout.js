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
import ProductSuperHeader from "../../Components/ProductSuperHeader/ProductSuperHeader";
import Banner from "../../Components/Banner/Banner";
import CheckoutPanel from "../../Components/CheckoutPanel/CheckoutPanel";
import CheckoutPanelArray from "../../Components/CheckoutPanelArray/CheckoutPanelArray";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
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
          axios.get(
            `http://localhost:${CLIENT_PORT}/api/v1/_PRODUCTS/${item.product}`,
            {
              headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage()}`,
              },
            }
          )
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
    <div className="_GLOBAL_PAGE_INNER_HOLDER_NOCONTENTSEPERATION">
      <ProductSuperHeader
        ContainerHeight="30px"
        ContainerWidth="100%"
        PhoneNumber="912121131313"
        MiddleMessage="Get 50% off on selected items | Shop Now"
        BackgroundColor="#2E0052"
        ImageHeight="80%"
        ImageWidth="20%"
      />
      <div className="_GLOBAL_MAIN_CONTENT_HOLDER">
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

        <div className="ContentHolder">
          <div className="HeadingContainer">Checkout</div>
          <div className="CheckoutContentHolder">
            <div className="CheckoutContentHolder_CheckoutDetais">
              <CheckoutPanel
                title="1. Delivery Address"
                Details="Akash Patel 104 kk hh nagar, Lucknow,Uttar Pradesh 226025"
              />

              <CheckoutPanel
                title="2. Payment method"
                Details="Pay on delivery ( Cash/Card)"
              />

              <CheckoutPanelArray title="3. Review items and delivery" />
            </div>

            <div className="CheckoutContentHolder_CheckoutPricingDetails">
              <div className="CheckoutContentHolder_CheckoutPricingDetails_Container">
                <button
                  onClick={handlePlaceOrderNavigationCheckout}
                  className="CheckoutContentHolder_CheckoutPricingDetails_Container_PlaceOrderButton"
                >
                  Place your order
                </button>

                <div className="Information">
                  By placing your order, you agree to Musicart privacy notice
                  and conditions of use.
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
                  <div>
                    &#8377;
                    {GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        ContainerHeight="40px"
        ContainerWidth="100%"
        FooterMessage="Musicart | All rights reserved"
        FooterBackground="
        #2E0052"
      />
    </div>
  );
};

export default Checkout;
