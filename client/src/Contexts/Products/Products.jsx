import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ProductsContext = createContext();

// Create the provider component
const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true); // Show loading state
      const response = await axios.get(
        "http://localhost:8000/api/v1/_PRODUCTS"
      );
      setProducts(response.data.products); // Assuming the response contains a list of products
      setError(null); // Reset any previous errors
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    // Run once when the component mounts
    getProducts();
  }, []); // Ensure the dependency array is empty

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        searchContent,
        setSearchContent,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook for consuming the context
const useProducts = () => useContext(ProductsContext);

export { ProductsContext, ProductsProvider, useProducts };
