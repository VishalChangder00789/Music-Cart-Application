import React, { useEffect, useState } from "react";
import "./QuantityControl.css";
import {
  getIdsFromLocalStorage,
  getProductIdFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Controller/localStorageConnection";

import {
  ADD_ITEM_TO_CART,
  GET_PRODUCT_BY_ID,
  REMOVE_ITEM_FROM_CART,
} from "../../Constants/Server_Path";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VIEWCART } from "../../Constants/Client_Path";

const QuantityControl = ({ quantity, productId }) => {
  const [quantityState, setQuantity] = useState(quantity);
  const navigate = useNavigate();

  const handleMinus = async (productId, quantityState) => {
    if (quantityState - 1 == 0) {
      await setQuantity(quantityState - 1);
      window.location.reload(false);
    }
    setQuantity(quantityState - 1);
    window.location.reload(false);

    const userId = JSON.parse(getIdsFromLocalStorage()).userId;
    const apiPath = REMOVE_ITEM_FROM_CART(userId, productId);

    const apiUrl = await axios
      .delete(apiPath)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePlus = async (productId, quantityState) => {
    setQuantity(quantityState + 1);
    const userId = JSON.parse(getIdsFromLocalStorage()).userId;
    const apiPath = ADD_ITEM_TO_CART(userId, productId);
    const apiUrl = await axios
      .post(apiPath)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="QuantityControlContainer">
      <div
        onClick={() => handleMinus(productId, quantityState)}
        className="Control minus"
      >
        -
      </div>
      <div className="Display">{quantityState}</div>
      <div
        onClick={() => handlePlus(productId, quantityState)}
        className="Control plus"
      >
        +
      </div>
    </div>
  );
};

export default QuantityControl;
