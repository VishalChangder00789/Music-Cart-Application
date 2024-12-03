import React, { useEffect, useState } from "react";
import "./_GLOBAL_MOBILE_PRODUCT_HOLDER.css";
import {
  DEPLOYED_BASE_URL,
  GET_ALL_PRODUCTS,
} from "../../../Constants/Server_Path";
import axios from "axios";

// Files
import _GLOBAL_MOBILE_PRODUCT_CARD from "../_GLOBAL_MOBILE_PRODUCT_CARD/_GLOBAL_MOBILE_PRODUCT_CARD";
import { CLIENT_PORT } from "../../../Constants/Client_Path";

const _GLOBAL_MOBILE_PRODUCT_HOLDER = ({
  setSelectedProduct,
  searchTerm,
  Parent_HeadPhoneType,
  Parent_Company,
  Parent_Color,
  Parent_Price,
  Parent_Featured,
}) => {
  const [products, setProducts] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  // const [Parent_HeadPhoneType, Parent_setHeadPhoneType] = useState("");
  // const [Parent_Company, Parent_setCompany] = useState("");
  // const [Parent_Color, Parent_setColor] = useState("");
  // const [Parent_Price, Parent_setPrice] = useState("");
  const [Parent_SearchTerm, Parent_setSearchTerm] = useState("");

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
        setProducts(response.data.products);
      });
    }

    if (Parent_Featured === "Name : (A-Z)") {
      axios.get(`${DEPLOYED_BASE_URL}/sortAscending`).then((response) => {
        setProducts(response.data.products);
      });
    }
  }, [Parent_Featured]);

  useEffect(() => {
    Parent_setSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <div className="_GLOBAL_MOBILE_PRODUCT_HOLDER_Container min-h-screen border">
      {products
        ? products.map((product) => {
            return (
              <_GLOBAL_MOBILE_PRODUCT_CARD
                product={product}
                setSelectedProduct={setSelectedProduct}
              />
            );
          })
        : ""}
    </div>
  );
};

export default _GLOBAL_MOBILE_PRODUCT_HOLDER;
