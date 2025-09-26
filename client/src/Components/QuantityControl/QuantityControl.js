import React, { useState } from "react";
import "./QuantityControl.css";
import { getIdsFromLocalStorage } from "../../Controller/localStorageConnection";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from "../../Constants/Server_Path";
import axios from "axios";
import { useCartContext } from "../../Contexts/CartContext/CartContext";

const QuantityControl = ({ quantity, productId }) => {
  const [quantityState, setQuantity] = useState(quantity);
  const { mergedData, setMergedData } = useCartContext();

  const handleMinus = async (productId, quantityState) => {
    // Prevent quantity from going below 0
    if (quantityState <= 0) return;

    const newQuantity = quantityState - 1;
    setQuantity(newQuantity); // Update the state first

    const userId = JSON.parse(getIdsFromLocalStorage()).userId;
    const apiPath = REMOVE_ITEM_FROM_CART(userId, productId);

    try {
      const response = await axios.delete(apiPath);

      // If quantity is 0 after the decrease, remove the item from the cart
      if (newQuantity === 0) {
        const updatedMergedData = mergedData.filter(
          (item) => item.product !== productId
        );
        setMergedData(updatedMergedData); // Remove the item from mergedData
      } else {
        // Otherwise, just update the quantity in mergedData
        const updatedMergedData = mergedData.map((item) => {
          if (item.product === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setMergedData(updatedMergedData);
      }
    } catch (err) {
      console.log(err);
      // Rollback state update if the API call fails
      setQuantity(quantityState);
    }
  };

  const handlePlus = async (productId, quantityState) => {
    const newQuantity = quantityState + 1;
    setQuantity(newQuantity); // Update the state first

    const userId = JSON.parse(getIdsFromLocalStorage()).userId;
    const apiPath = ADD_ITEM_TO_CART(userId, productId);

    try {
      const response = await axios.post(apiPath);

      // Update the quantity in mergedData
      const updatedMergedData = mergedData.map((item) => {
        if (item.product === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setMergedData(updatedMergedData); // Update mergedData
    } catch (error) {
      console.log(error);
      // Rollback state update if the API call fails
      setQuantity(quantityState);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col border justify-between rounded-sm w-10 lg:w-full">
      <div
        onClick={() => handleMinus(productId, quantityState)}
        className="cursor-pointer flex items-center justify-center p-2 lg:w-1/3 w-full bg-red-500 text-white"
      >
        -
      </div>
      <div className="flex items-center justify-center p-2 lg:w-1/3 w-full">
        {quantityState}
      </div>
      <div
        className="cursor-pointer flex items-center justify-center p-2 lg:w-1/3 w-full bg-green-500 text-white"
        onClick={() => handlePlus(productId, quantityState)}
      >
        +
      </div>
    </div>
  );
};

export default QuantityControl;
