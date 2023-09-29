// api support https://dummyjson.com/docs/products

import "./App.css";
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

//Mobile Files
import Mobile_Login from "./Mobile/MobilePages/Mobile_Login/Mobile_Login";
import Mobile_Register from "./Mobile/MobilePages/Mobile_Register/Mobile_Register";
import Mobile_Product from "./Mobile/MobilePages/Mobile_Product/Mobile_Product";

function App() {
  const [SelectedProduct, setSelectedProduct] = useState({});

  //#region SCREEN SETTING

  const [width, setWidth] = useState(window.innerWidth);

  const handleScreenSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);

    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  if (width < 450) {
    console.log("Mobile");
    return (
      <div className="Mobile">
        <BrowserRouter>
          <Routes>
            <Route path={REGISTER} element={<Mobile_Register />} />
            <Route path={LOGIN} element={<Mobile_Login />} />
            <Route path={PRODUCTS} element={<Mobile_Product />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    console.log("pc");
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/thankyou" element={<Thankyou />} />
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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
