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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={PRODUCTS} element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
