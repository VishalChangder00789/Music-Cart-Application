import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getIdsFromLocalStorage } from "../../../Controller/localStorageConnection";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState("");
  const [accountDeletion, setAccountDeletion] = useState(false);
  // asda
  return (
    <UserInformationContext.Provider
      value={{
        userInformation,
        setUserInformation,
        accountDeletion,
        setAccountDeletion,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export { UserInformationContext, UserInformationProvider };
export const useUserInformation = () => useContext(UserInformationContext);
