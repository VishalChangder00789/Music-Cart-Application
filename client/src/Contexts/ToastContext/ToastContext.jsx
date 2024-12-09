import React, { createContext, useState } from "react";

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const [apiErrors, setApiErrors] = useState("Hello");

  return (
    <ToastContext.Provider value={{ apiErrors, setApiErrors }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
