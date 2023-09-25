import React from "react";
import "./CheckoutPanel.css";

const CheckoutPanel = ({ title, Details }) => {
  return (
    <div className="CheckoutPanelContainer">
      <div className="CheckoutPanelContainer_Title">{title}</div>
      <div className="CheckoutPanelContainer_Details">{Details}</div>
    </div>
  );
};

export default CheckoutPanel;
