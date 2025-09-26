import React, { useContext, useState } from "react";
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
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import EditProfile from "./Pages/EditProfile/EditProfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContext } from "./Contexts/ToastContext/ToastContext";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ConfirmPasswordPage from "./Pages/ConfirmPasswordPage/ConfirmPasswordPage";
import { ModalProvider } from "./CommonComponents/Modal/contexts/ModalContext";
import Modal from "./CommonComponents/Modal/Modal";
import { NightModeProvider } from "./Contexts/OtherCommonContext/NightModeContext";
import { ProductsProvider } from "./Contexts/Products/Products";
import ServerCheck from "./Pages/ServerCheck/ServerCheck";
import { CartContextProvider } from "./Contexts/CartContext/CartContext";
import { FilterProvider } from "./Contexts/FilterContext/FilterContext";
import { FilterAttributeProvider } from "./Contexts/FilterAttributeContext/FilterAttributeContext";

function App() {
  const [SelectedProduct, setSelectedProduct] = useState({});
  const { width } = useScreenSize();
  const { apiErrors } = useContext(ToastContext);

  const isMobile = width < 450;

  return (
    <div className={isMobile ? "Mobile" : "App"}>
      <FilterProvider>
        <FilterAttributeProvider>
          <ProductsProvider>
            <NightModeProvider>
              <ModalProvider>
                <ServerCheck>
                  <Modal />
                  <CartContextProvider>
                    <BrowserRouter>
                      <ToastContainer
                        position="bottom-center"
                        draggable
                        theme="light"
                        className="custom-toast"
                      />
                      <UserInformationProvider>
                        <Routes>
                          <Route path="/thankyou" element={<Thankyou />} />
                          <Route
                            path="/forget-password"
                            element={<ForgotPassword />}
                          />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute>
                                <Profile />
                              </ProtectedRoute>
                            }
                          />
                          <Route path={CHECKOUT} element={<Checkout />} />
                          <Route path={BASEURL} element={<Products />} />
                          <Route path={LOGIN} element={<Login />} />
                          <Route path={REGISTER} element={<Register />} />
                          <Route
                            path={VIEWCART}
                            element={
                              <ProtectedRoute>
                                <ViewCart />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path={"/editProfile"}
                            element={
                              <ProtectedRoute>
                                <EditProfile />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path={"/editProfile/:userId"}
                            element={
                              <ProtectedRoute>
                                <EditProfile />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/reset-password/confirm-password/:token"
                            element={<ConfirmPasswordPage />}
                          />
                          <Route
                            path="/product/:productId"
                            element={
                              <ProtectedRoute>
                                <SingleProduct />
                              </ProtectedRoute>
                            }
                          />
                        </Routes>

                        {isMobile ? <FooterOptions /> : <Footer />}
                      </UserInformationProvider>
                    </BrowserRouter>
                  </CartContextProvider>
                </ServerCheck>
              </ModalProvider>
            </NightModeProvider>
          </ProductsProvider>
        </FilterAttributeProvider>
      </FilterProvider>
    </div>
  );
}

export default App;
