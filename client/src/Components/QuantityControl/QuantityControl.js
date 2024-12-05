import React, { useState } from "react";
import "./QuantityControl.css";
import { getIdsFromLocalStorage } from "../../Controller/localStorageConnection";

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from "../../Constants/Server_Path";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuantityControl = ({ quantity, productId }) => {
  const [quantityState, setQuantity] = useState(quantity);

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
    <div className="flex border justify-between rounded-sm">
      <div
        onClick={() => handleMinus(productId, quantityState)}
        className="flex items-center justify-center p-2 w-1/3 bg-red-500 text-white"
      >
        -
      </div>
      <div className="flex items-center justify-center p-2 w-1/3">
        {quantityState}
      </div>
      <div
        className="flex items-center justify-center p-2 w-1/3 bg-green-500 text-white"
        onClick={() => handlePlus(productId, quantityState)}
      >
        +
      </div>
    </div>
  );
};

export default QuantityControl;
