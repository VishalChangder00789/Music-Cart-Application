import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getIdsFromLocalStorage } from "../../../Controller/localStorageConnection";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState("");

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
