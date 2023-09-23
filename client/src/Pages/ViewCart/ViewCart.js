import React from "react";
import "./ViewCart.css";
import ProductSuperHeader from "../../Components/ProductHeader/ProductSuperHeader";
import Footer from "../../Components/Footer/Footer";
import Banner from "../../Components/Banner/Banner";

// Files
import CartLogo from "../../Assets/mycart.png";

import { PRODUCTS } from "../../Constants/Client_Path";
import Button from "../../Components/Buttons/Button";

const ViewCart = () => {
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
            <div className="CartDetails">DE</div>
            <div className="TotalPricing">
              <div className="PricingText">
                <span>PRICE DETAILS</span>
                <div>Total MRP {"            "}120000000</div>
                <div>Discount on MRP {"            "}50%</div>
                <div>Convenience Fee {"            "}2%</div>
              </div>

              <div className="CartTotalAmount">
                <span>Total Amount {"            "}34999</span>
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
              />
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

export default ViewCart;
