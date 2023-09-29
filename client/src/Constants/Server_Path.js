import { CLIENT_PORT } from "./Client_Path";

// BASE URL
export const SERVER_BASEURL = `http://localhost:${CLIENT_PORT}/api/v1`;
export const DEPLOYED_BASE_URL = `https://music-cart-backend-5.onrender.com/api/v1`;

// Products
export const GET_ALL_PRODUCTS = DEPLOYED_BASE_URL + "/_PRODUCTS";
export const CREATE_A_PRODUCT = DEPLOYED_BASE_URL + "/_PRODUCTS";
export const GET_PRODUCT_BY_ID = (id) => {
  return `${DEPLOYED_BASE_URL}/_PRODUCTS/${id}`;
};
export const UPDATE_PRODUCT_BY_ID = (id) => {
  return `${DEPLOYED_BASE_URL}/_PRODUCTS/${id}`;
};

// USERS
export const SERVER_GET_ALL_USERS = "/_USERS";
export const SERVER_REGISTER_ALL_USERS = SERVER_BASEURL + "/_REGISTER";
export const SERVER_LOGIN = SERVER_BASEURL + "/_LOGIN";

// CART
export const ADD_ITEM_TO_CART = (userId, productId) => {
  return `${SERVER_BASEURL}/_USERS/${userId}/_ADDPRODUCT/${productId}`;
};

export const REMOVE_ITEM_FROM_CART = (userId, productId) => {
  return `${SERVER_BASEURL}/_USERS/${userId}/_ADDPRODUCT/${productId}`;
};

export const GET_USER_CART = (cartId) => {
  return `${SERVER_BASEURL + `/_CARTS/${cartId}`}`;
};

export const GET_ALL_CARTS = SERVER_BASEURL + "/_CARTS";
