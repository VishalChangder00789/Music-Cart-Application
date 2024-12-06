import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getIdsFromLocalStorage } from "../../../Controller/localStorageConnection";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState("");

  useEffect(() => {
    const getUserInformation = async () => {
      const userId = JSON.parse(getIdsFromLocalStorage()).userId;
      console.log(userId);
      const response = await axios.get(
        `https://music-cart-backend-5.onrender.com/api/v1/_USERS/${userId}`
      );
      console.log(response);
      setUserInformation(response.data.data);
    };

    getUserInformation();
  }, []);

  return (
    <UserInformationContext.Provider
      value={{ userInformation, setUserInformation }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export { UserInformationContext, UserInformationProvider };
export const useUserInformation = () => useContext(UserInformationContext);
