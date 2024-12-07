import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import FooterOptions from "./CommonComponents/FooterOptions/footer-options";
import Footer from "./Components/Footer/Footer";
import Profile from "./Pages/Profile/Profile";

import { UserInformationProvider } from "./Pages/Profile/contexts/user-information";
import useScreenSize from "./CustomHooks/useScreenSize";
import isLoggedIn from "./CustomHooks/IsLoggedIn";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import EditProfile from "./Pages/EditProfile/EditProfile";

function App() {
  const [SelectedProduct, setSelectedProduct] = useState({});
  const { width } = useScreenSize();

  console.log(isLoggedIn());

  const isMobile = width < 450;

  return (
    <div className={isMobile ? "Mobile" : "App"}>
      <BrowserRouter>
        <UserInformationProvider>
          <Routes>
            <Route path="/thankyou" element={<Thankyou />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
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
              element={
                <ProtectedRoute>
                  <SingleProduct SelectedProduct={SelectedProduct} />
                </ProtectedRoute>
              }
            />
            <Route
              path={VIEWCART}
              element={
                <ProtectedRoute>
                  <ViewCart />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path={"/editProfile"}
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
          {isMobile ? <FooterOptions /> : <Footer />}
        </UserInformationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
