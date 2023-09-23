import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";

import ProductSuperHeader from "../../Components/ProductHeader/ProductSuperHeader";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/ProductCard/ProductCard";

import { getProducts } from "../../Controller/productController";
import FilterMechanism from "../../Components/FilterMechanism/FilterMechanism";

const Products = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/_PRODUCTS").then((data) => {
      // setProducts(data.data.products);
      console.log(data.data.products);
      setProducts(data.data.products);
    });
  }, []);

  return (
    <div className="_GLOBAL_PAGE_INNER_HOLDER">
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
          showAdBanner
          productPath={false}
          showClassifiedButton={false}
          navigationRoute
          BannerContainerWidth="100%"
          LogoContainerWidth="20%"
          LogoContainerHeight="40px"
          LogoWidth="60%"
          LogoHeigth="100%"
        />
        <FilterMechanism setShowGrid={setShowGrid} />

        {/* 
        
          Put all the products here
        
        
        */}
        <div
          className={showGrid ? `ProductHandler-Grid` : `ProductHandler-List`}
        >
          {products
            ? products.map((product) => {
                return (
                  <ProductCard
                    product={product}
                    showGrid={showGrid}
                    setSelectedProduct={setSelectedProduct}
                  />
                );
              })
            : ""}
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

export default Products;
