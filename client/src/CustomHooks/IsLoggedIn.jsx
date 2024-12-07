import React from "react";
import { jwtDecode } from "jwt-decode";

const isLoggedIn = () => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      // Invalid token
      localStorage.removeItem("userToken");
      localStorage.removeItem("UserIds");
      return false;
    }

    return true;
  } catch (err) {
    console.error("Token is invalid");
    return false;
  }
};

export default isLoggedIn;
