import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LOGIN,
  REGISTER,
  PRODUCTS,
  SINGLEPRODUCT,
  VIEWCART,
  BASEURL,
  CHECKOUT,
} from "./Constants/Client_Path";

// Files
import { useEffect, useState } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Products from "./Pages/Products/Products";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import ViewCart from "./Pages/ViewCart/ViewCart";
import Checkout from "./Pages/Checkout/Checkout";
import Thankyou from "./Pages/Thankyou/Thankyou";

// Mobile Files
import Mobile_Login from "./Mobile/MobilePages/Mobile_Login/Mobile_Login";
import Mobile_Register from "./Mobile/MobilePages/Mobile_Register/Mobile_Register";
import Mobile_Product from "./Mobile/MobilePages/Mobile_Product/Mobile_Product";
import Mobile_SingleProduct from "./Mobile/MobilePages/Mobile_SingleProduct/Mobile_SingleProduct";
import Mobile_Cart from "./Mobile/MobilePages/Mobile_Cart/Mobile_Cart";
import Mobile_Checkout from "./Mobile/MobilePages/Mobile_Checkout/Mobile_Checkout";
import Mobile_Thankyou from "./Mobile/MobilePages/Mobile_Thankyou/Mobile_Thankyou";
import FooterOptions from "./CommonComponents/FooterOptions/footer-options";
import Mobile_Profile from "./Mobile/MobilePages/Mobile_Profile/Mobile_Profile";

import { DropdownOptionsProvider } from "./Mobile/MobileComponents/Dropdown-Selectable/context/DropdownOptionsContext/DropdownOptionsContext";
import Footer from "./Components/Footer/Footer";
import Profile from "./Pages/Profile/Profile";
import { UserInformationProvider } from "./Pages/Profile/contexts/user-information";

function App() {
  const [SelectedProduct, setSelectedProduct] = useState({});
  const [width, setWidth] = useState(window.innerWidth);

  const handleScreenSize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  const isMobile = width < 450;

  return (
    <div className={isMobile ? "Mobile" : "App"}>
      <BrowserRouter>
        <UserInformationProvider>
          <Routes>
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/profile" element={<Profile />} />
            <Route path={CHECKOUT} element={<Checkout />} />
            <Route
              path={BASEURL}
              element={<Products setSelectedProduct={setSelectedProduct} />}
            />
            <Route path={LOGIN} element={<Login />} />
            <Route path={REGISTER} element={<Register />} />
            <Route
              path={PRODUCTS}
              element={<Products setSelectedProduct={setSelectedProduct} />}
            />
            <Route
              path={SINGLEPRODUCT}
              element={<SingleProduct SelectedProduct={SelectedProduct} />}
            />
            <Route path={VIEWCART} element={<ViewCart />} />
          </Routes>
          {isMobile ? <FooterOptions /> : <Footer />}
        </UserInformationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
