// api support https://dummyjson.com/docs/products

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LOGIN,
  REGISTER,
  PRODUCTS,
  SINGLEPRODUCT,
} from "./Constants/Client_Path";

// Files
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Products from "./Pages/Products/Products";
import { useState } from "react";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
