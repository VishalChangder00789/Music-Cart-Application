import React, { useState } from "react";

const ProductControl = () => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    imageURL: [""],
    rating: "",
    color: "",
    productType: "",
    about: "",
    brand: "",
    available: false,
    price: "",
    codeName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, value) => {
    const updatedImages = [...productDetails.imageURL];
    updatedImages[index] = value;
    setProductDetails((prevState) => ({
      ...prevState,
      imageURL: updatedImages,
    }));
  };

  const addImageField = () => {
    setProductDetails((prevState) => ({
      ...prevState,
      imageURL: [...prevState.imageURL, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Details Submitted:", productDetails);
    alert("Product details submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10 p-8 bg-gray-900 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">
        Add Product Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={productDetails.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium">Image URLs</label>
          {productDetails.imageURL.map((url, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={url}
                onChange={(e) => handleArrayChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 text-teal-400 hover:underline"
          >
            + Add another image URL
          </button>
        </div>
        <div>
          <label className="block text-gray-300 font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            value={productDetails.rating}
            onChange={handleInputChange}
            placeholder="Enter product rating (e.g., 4.5)"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium">Color</label>
          <input
            type="text"
            name="color"
            value={productDetails.color}
            onChange={handleInputChange}
            placeholder="Enter product color"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium">
            Product Type
          </label>
          <input
            type="text"
            name="productType"
            value={productDetails.productType}
            onChange={handleInputChange}
            placeholder="Enter product type"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium">About</label>
          <textarea
            name="about"
            value={productDetails.about}
            onChange={handleInputChange}
            placeholder="Describe the product"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium">Brand</label>
          <input
            type="text"
            name="brand"
            value={productDetails.brand}
            onChange={handleInputChange}
            placeholder="Enter brand name"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="flex items-center text-gray-300 font-medium">
            <input
              type="checkbox"
              name="available"
              checked={productDetails.available}
              onChange={(e) =>
                setProductDetails((prevState) => ({
                  ...prevState,
                  available: e.target.checked,
                }))
              }
              className="mr-2 bg-gray-800 border-gray-700 text-teal-500 focus:ring-teal-500"
            />
            Available
          </label>
        </div>
        <div>
          <label className="block text-gray-300 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium">Code Name</label>
          <input
            type="text"
            name="codeName"
            value={productDetails.codeName}
            onChange={handleInputChange}
            placeholder="Enter product code name"
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-200"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default ProductControl;
