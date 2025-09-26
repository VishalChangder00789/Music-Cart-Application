import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import NameColumn from "./components/Coloumn/Colomn";

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(200); // Default width in pixels
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  useEffect(() => {
    console.log(editingProduct);
  }, [editingProduct]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/_PRODUCTS"
      );
      setProducts(response.data.products);
    };

    getProducts();
  }, []);

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    setEditingProduct(productToEdit); // Set the product details for editing
  };

  const handleDelete = (id) => {
    // Logic for deleting
  };

  const handleWidthChange = (e) => {
    setWidth(parseInt(e.target.value, 10)); // Update width from slider
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const productId = id;
    try {
      // Send updated product to backend API
      const response = await axios.put(
        `http://localhost:8000/api/v1/_PRODUCTS/${productId}`,
        editingProduct
      );
      alert("Product details updated successfully!");
      // Optionally, refetch the products list to reflect the update
      const updatedProducts = await axios.get(
        "http://localhost:8000/api/v1/_PRODUCTS"
      );
      setProducts(updatedProducts.data.products);
      setEditingProduct(null); // Close the form after updating
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-black mb-6">
        Product Management
      </h2>

      {/* Slider to adjust column width */}
      <div style={{ marginBottom: "10px" }}>
        <label className="text-black font-medium">
          Adjust Name Column Width:
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          value={width}
          onChange={handleWidthChange}
          className="ml-2 bg-gray-700"
        />
        <span className="ml-2 text-black-300">{width}px</span>{" "}
        {/* Show width */}
      </div>

      {/* Table for displaying products */}
      <table className="min-w-full table-auto bg-gray-800 overflow-hidden">
        <thead>
          <tr className="bg-teal-600 text-white">
            <th className="px-4 py-2">Sno.</th>
            <th className="px-4 py-2" style={{ width: `${width}px` }}>
              Name
            </th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className="border-t border-gray-700 hover:bg-gray-700 text-white"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td style={{ width: `${width}px` }} className="px-4 py-3">
                <NameColumn name={product.productName} />
              </td>
              <td className="px-4 py-3">{product.brand}</td>
              <td className="px-4 py-3">{product.price}</td>
              <td className="px-4 py-3 flex space-x-2">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="text-teal-400 hover:text-teal-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to edit product details */}
      {editingProduct && (
        <div className="max-w-4xl mx-auto mt-10 mb-10 p-8 bg-gray-900 shadow-xl rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-100 mb-6">
            Edit Product Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(editingProduct).map((key) => {
              // Skip _id and other non-editable fields like timestamps
              if (key === "_id" || key === "createdAt" || key === "updatedAt") {
                return null;
              }

              return (
                <div key={key}>
                  <label className="block text-gray-300 font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={editingProduct[key]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key}`}
                    className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              );
            })}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-200"
            >
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
