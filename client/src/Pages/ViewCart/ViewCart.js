import React, { useContext, useEffect, useState } from "react";
import "./ViewCart.css";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import Banner from "../../Components/Banner/Banner";
import CartItem from "../../Components/CartItem/CartItem";
import { DEPLOYED_BASE_URL } from "../../Constants/Server_Path";

// Hhahahahaha

// Files are removed
import CartLogo from "../../Assets/mycart.png";

import { CLIENT_PORT, PRODUCTS } from "../../Constants/Client_Path";
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
import { useNightModeContext } from "../../Contexts/OtherCommonContext/NightModeContext";
import {
  CartContext,
  useCartContext,
} from "../../Contexts/CartContext/CartContext";

const ViewCart = () => {
  const { carts, mergedData, setMergedData } = useCartContext();

  const navigate = useNavigate();
  const { isNightMode } = useNightModeContext();
  const handlePlaceOrderNavigation = () => {
    navigate("/checkout");
  };

  return (
    <div className="lg:flex lg:flex-col">
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
      <div
        className={`p-4 min-h-[750px] ${
          isNightMode ? "bg-[#221128]" : "bg-[#f6f6f6]"
        } 
        ${isNightMode ? `bg-[#221128]` : `bg-white`}
        `}
      >
        <div className="flex lg:justify-around flex-col lg:flex-row">
          <div className="lg:min-h-[550px] lg:w-1/2 lg:flex lg:flex-col p-2">
            {mergedData
              ? mergedData.map((item) => {
                  return (
                    <>
                      <CartItem key={item._id} singleProduct={item} />
                    </>
                  );
                })
              : ""}
          </div>

          <div className="lg:w-1/3 lg:relative mt-4 p-2">
            <div
              className={`lg:w-full lg:sticky lg:top-28 lg:min-h-[300px] lg:max-h-96 lg:flex lg:flex-col lg:items-center lg:mt-4 ${
                isNightMode
                  ? `bg-[#85608e] text-white lg:p-4 p-2 rounded-md`
                  : `lg:bg-[#f6f6f6] lg:p-2`
              }`}
            >
              <div className="lg:w-full">
                <span className="text-xs font-semibold">Details</span>
                <div className="flex w-full justify-between items-center mt-6">
                  <div>Total </div>
                  <div className="lg:mr-10 mr-3 flex">
                    <div>&#8377;</div>
                    <div className="text-xl font-semibold">
                      {GetTotalPrice(mergedData)}
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between items-center">
                  <div>Discount on MRP(50%)</div>
                  <div className="lg:mr-10 mr-3 flex">
                    <div>- &#8377;</div>
                    <div className="text-xl font-semibold">
                      {GetDiscountedPrice(GetTotalPrice(mergedData), 50)}
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between items-center">
                  <div>Convenience Fee(2%)</div>
                  <div className="lg:mr-10 mr-3 flex">
                    <div>+ &#8377;</div>
                    <div className="text-xl font-semibold">
                      {(GetDiscountedPrice(GetTotalPrice(mergedData), 50) * 2) /
                        100}
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-xs font-semibold">
                  <div>Total Items</div>
                  <div className="">{mergedData.length} Item</div>
                </div>
              </div>

              <div className="w-full mt-6">
                <div className="flex w-full justify-between items-center">
                  <div className="text-xs font-semibold flex items-center">
                    Total Amount{" "}
                  </div>
                  <div className="flex lg:mr-10 mr-3">
                    <div>&#8377;</div>
                    <div className="text-xl font-semibold">
                      {GetPriceConvientFees(GetTotalPrice(mergedData), 2, 50)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center mt-10">
                <Button
                  label="PLACE ORDER"
                  background={`${isNightMode ? `` : `#FFD600`}`}
                  textColor="black"
                  marginTop="0"
                  ButtonWidth="100%"
                  ButtonHeight="100%"
                  ButtonActivation={handlePlaceOrderNavigation}
                  borderColor="transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
