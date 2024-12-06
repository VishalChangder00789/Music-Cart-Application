import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";

import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import ProductCard from "../../Components/ProductCard/ProductCard";
import FilterMechanism from "../../Components/FilterMechanism/FilterMechanism";
import { GET_ALL_PRODUCTS } from "../../Constants/Server_Path";
import { CLIENT_PORT } from "../../Constants/Client_Path";
import { DEPLOYED_BASE_URL } from "../../Constants/Server_Path";
import useScreenSize from "../../CustomHooks/useScreenSize";

const Products = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const { width } = useScreenSize();

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
        `${DEPLOYED_BASE_URL}/_PRODUCTS/?search=${Parent_SearchTerm}&color=${Parent_Color}&brand=${Parent_Company}&productType=${Parent_HeadPhoneType}&price=${Parent_Price}`
      )
      .then((response) => {
        setProducts(response.data.products);
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
      axios.get(`${DEPLOYED_BASE_URL}/price_lowest`).then((response) => {
        console.log(response.data.products);
        setProducts(response.data.products);
      });
    }

    if (Parent_Featured === "Name : (A-Z)") {
      axios.get(`${DEPLOYED_BASE_URL}/sortAscending`).then((response) => {
        setProducts(response.data.products);
      });
    }
  }, [Parent_Featured]);

  return (
    <div className="w-screen">
      <Banner />
      <div className="p-4">
        {width > 768 ? (
          <FilterMechanism
            setShowGrid={setShowGrid}
            Parent_setHeadPhoneType={Parent_setHeadPhoneType}
            Parent_setCompany={Parent_setCompany}
            Parent_setColor={Parent_setColor}
            Parent_setPrice={Parent_setPrice}
            Parent_setSearchTerm={Parent_setSearchTerm}
            Parent_setFeatured={Parent_setFeatured}
            showGrid={showGrid}
          />
        ) : (
          ""
        )}

        <div
          className={
            showGrid
              ? `grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10 mb-3% lg:mt-8 min-h-screen`
              : `ProductHandler-List mt-8 min-h-screen`
          }
        >
          {products
            ? products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    showGrid={showGrid}
                    setSelectedProduct={setSelectedProduct}
                  />
                );
              })
            : ""}
        </div>
      </div>

      {/* <Footer
        ContainerHeight="40px"
        ContainerWidth="100%"
        FooterMessage="Musicart | All rights reserved"
        FooterBackground="
        #2E0052"
      /> */}
    </div>
  );
};

export default Products;
