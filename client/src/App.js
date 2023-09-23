// api support https://dummyjson.com/docs/products

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LOGIN,
  REGISTER,
  PRODUCTS,
  SINGLEPRODUCT,
  VIEWCART,
} from "./Constants/Client_Path";

// Files
import { useState } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Products from "./Pages/Products/Products";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import ViewCart from "./Pages/ViewCart/ViewCart";

function App() {
  const [SelectedProduct, setSelectedProduct] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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

export default App;
