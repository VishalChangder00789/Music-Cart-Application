import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";

import ProductSuperHeader from "../../Components/ProductSuperHeader/ProductSuperHeader";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/ProductCard/ProductCard";
import FilterMechanism from "../../Components/FilterMechanism/FilterMechanism";
import { GET_ALL_PRODUCTS } from "../../Constants/Server_Path";

const Products = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const [Parent_HeadPhoneType, Parent_setHeadPhoneType] = useState("");
  const [Parent_Company, Parent_setCompany] = useState("");
  const [Parent_Color, Parent_setColor] = useState("");
  const [Parent_Price, Parent_setPrice] = useState("");
  const [Parent_SearchTerm, Parent_setSearchTerm] = useState("");
  const [Parent_Featured, Parent_setFeatured] = useState("");

  useEffect(() => {
    axios.get(GET_ALL_PRODUCTS).then((data) => {
      // setProducts(data.data.products);
      setProducts(data.data.products);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/_PRODUCTS/?search=${Parent_SearchTerm}&color=${Parent_Color}&brand=${Parent_Company}&productType=${Parent_HeadPhoneType}&price=${Parent_Price}`
      )
      .then((response) => {
        console.log(response);
        setProducts(response.data.products);
        console.log(products);
      });
    //}
  }, [
    Parent_HeadPhoneType,
    Parent_Company,
    Parent_Color,
    Parent_Price,
    Parent_SearchTerm,
  ]);

  useEffect(() => {
    if (Parent_Featured === "Price : Lowest") {
      axios
        .get(`http://localhost:8000/api/v1/price_lowest`)
        .then((response) => {
          console.log(response.data.products);
          setProducts(response.data.products);
        });
    }

    if (Parent_Featured === "Name : (A-Z)") {
      axios
        .get(`http://localhost:8000/api/v1/sortAscending`)
        .then((response) => {
          setProducts(response.data.products);
        });
    }
  }, [Parent_Featured]);

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
        <FilterMechanism
          setShowGrid={setShowGrid}
          Parent_setHeadPhoneType={Parent_setHeadPhoneType}
          Parent_setCompany={Parent_setCompany}
          Parent_setColor={Parent_setColor}
          Parent_setPrice={Parent_setPrice}
          Parent_setSearchTerm={Parent_setSearchTerm}
          Parent_setFeatured={Parent_setFeatured}
        />

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
