import axios from "axios";

export const getProducts = () => {
  axios.get("https://dummyjson.com/products").then((res) => {
    console.log(res);
  });
};
