import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContextProvider } from "./Contexts/ToastContext/ToastContext";

ReactDOM.render(
  <ToastContextProvider>
    <App />
  </ToastContextProvider>,
  document.getElementById("root")
);
