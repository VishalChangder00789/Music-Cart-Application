import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import ProductControl from "./pages/ProductControl/ProductControl";
import Navbar from "./components/Navbar/Navbar";
import EditProduct from "./pages/EditProduct/EditProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/add-products" element={<ProductControl />} />
          <Route path="/edit-products" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
