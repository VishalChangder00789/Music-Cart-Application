import React, { useState, useEffect } from "react";
import FooterButtons from "./components/Footer-Buttons.jsx/footer-button";
import { useLocation } from "react-router-dom";
import { DEPLOYED_BASE_URL, GET_USER_CART } from "../../Constants/Server_Path";
import axios from "axios";

const FooterOptions = () => {
  const [selectedIcon, setSelectedIcon] = useState(""); // Track the selected icon
  const [numberOfItems, setNumberItems] = useState(0);
  const location = useLocation(); // Get the current location (pathname)
  let cartId = 0;

  useEffect(() => {
    const getCartTotalNumber = async () => {
      const response = await axios.get(GET_USER_CART(cartId));
      const noOfItems = response.data.UserCart.items.length;
      setNumberItems(noOfItems);
    };

    if (localStorage.getItem("UserId")) {
      cartId = JSON.parse(localStorage.getItem("UserIds")).cartId;
      getCartTotalNumber();
    }
  });

  // Set the selected icon when the component mounts or when the location changes
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedIcon("HOME");
        break;
      case "/viewCart":
        setSelectedIcon("CART");
        break;
      case "/profile":
        setSelectedIcon("PROFILE");
        break;
      default:
        setSelectedIcon(""); // Default case if no match
    }
  }, [location.pathname]);

  return (
    <div className="w-full flex items-center justify-center p-2 sticky bottom-0">
      <div className="border shadow-md shadow-[#24242459] rounded-[24px] flex w-[250px] min-h-16 items-center justify-evenly bg-[#f9f8f8]">
        <FooterButtons
          iconsType="HOME"
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
        <FooterButtons
          iconsType="CART"
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          numberOfItems={numberOfItems}
        />
        <FooterButtons
          iconsType="PROFILE"
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
    </div>
  );
};

export default FooterOptions;
