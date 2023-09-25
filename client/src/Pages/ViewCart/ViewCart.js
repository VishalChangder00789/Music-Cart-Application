import React, { useEffect, useState } from "react";
import "./ViewCart.css";
import axios from "axios";
import ProductSuperHeader from "../../Components/ProductSuperHeader/ProductSuperHeader";
import Footer from "../../Components/Footer/Footer";
import Banner from "../../Components/Banner/Banner";
import CartItem from "../../Components/CartItem/CartItem";

// Files
import CartLogo from "../../Assets/mycart.png";

import { PRODUCTS } from "../../Constants/Client_Path";
import Button from "../../Components/Buttons/Button";
import { GET_PRODUCT_BY_ID, GET_USER_CART } from "../../Constants/Server_Path";
import { json, useNavigate } from "react-router-dom";
import {
  getIdsFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Controller/localStorageConnection";
import {
  GetDiscountedPrice,
  GetPriceConvientFees,
  GetTotalPrice,
} from "../../Controller/Utilities";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const navigate = useNavigate();
  const handlePlaceOrderNavigation = () => {
    navigate("/checkout");
  };

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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="_GLOBAL_PAGE_INNER_HOLDER_NOSPACING">
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
          productPath="View Cart"
          showClassifiedButton={true}
          navigationRoute={PRODUCTS}
          BannerContainerWidth="100%"
          LogoContainerWidth="40%"
          LogoContainerHeight="40pX"
          LogoWidth="30%"
          LogoHeigth="35px"
        />

        <div className="ViewCartInnerBody">
          <div className="ViewCartLogo">
            <img src={CartLogo} />
          </div>
          <div className="ViewCart-BiSection">
            <div className="CartDetails">
              {mergedData
                ? mergedData.map((item) => {
                    return <CartItem key={item._id} singleProduct={item} />;
                  })
                : ""}
            </div>
            <div className="TotalPricing">
              <div className="PricingText">
                <span className="PR_Heading">PRICE DETAILS</span>
                <div className="PR_Heading">
                  <div>Total MRP </div>
                  <div className="SubHeading">{GetTotalPrice(mergedData)}</div>
                </div>
                <div className="PR_Heading">
                  <div>Discount on MRP(50%)</div>
                  <div className="SubHeading">
                    {GetDiscountedPrice(GetTotalPrice(mergedData), 50)}
                  </div>
                </div>
                <div className="PR_Heading">
                  <div>Convenience Fee(2%)</div>
                  <div className="SubHeading">
                    {GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
                  </div>
                </div>
              </div>

              <div className="CartTotalAmount">
                <div className="PR_Heading">
                  <div>Total Amount </div>
                  <div className="SubHeading">
                    {GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
                  </div>
                </div>
              </div>
              <Button
                label="PLACE ORDER"
                background="#FFD600"
                containerWidth="100%"
                containerHeight="60px"
                ButtonWidth="100%"
                ButtonHeight="100%"
                textColor="black"
                borderColor="white"
                marginTop="5%"
                borderRadius="7px"
                ButtonActivation={handlePlaceOrderNavigation}
              />
            </div>
          </div>
        </div>

        <div className="Additional_Information">
          <div className="items">{mergedData.length} Item</div>
          <div className="items">&#8377;{GetTotalPrice(mergedData)}</div>
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

export default ViewCart;
