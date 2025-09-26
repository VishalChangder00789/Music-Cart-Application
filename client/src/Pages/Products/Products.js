import React, { useEffect, useState, useMemo } from "react";
import { useProducts } from "../../Contexts/Products/Products";
import Banner from "../../Components/Banner/Banner";
import ProductCard from "../../Components/ProductCard/ProductCard";
import FilterMechanism from "../../Components/FilterMechanism/FilterMechanism";
import useScreenSize from "../../CustomHooks/useScreenSize";
import { useNightModeContext } from "../../Contexts/OtherCommonContext/NightModeContext";
import { useFilterContext } from "../../Contexts/FilterContext/FilterContext";
import noproducts from "../../Assets/no-products.png";
import { use } from "react";

const Products = ({ setSelectedProduct }) => {
  // Using context values
  const { products, searchContent, loading, error } = useProducts();
  const {
    selectedHeadphoneType,
    selectedCompany,
    selectedColor,
    selectedPrice,
    selectedFeatured,
    sortedProducts,
    setSortedProducts,
  } = useFilterContext();

  const [showGrid, setShowGrid] = useState(true);
  const { width } = useScreenSize();
  const { isNightMode } = useNightModeContext();

  // Filter products based on search and selected attributes
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product?.productName?.toLowerCase() || "";
      const productCompany = product?.brand?.toLowerCase() || "";
      const productColor = product?.color?.toLowerCase() || "";
      const searchTerm = searchContent.toLowerCase();

      // Filter conditions
      const matchesSearch =
        productName.includes(searchTerm) ||
        productCompany.includes(searchTerm) ||
        productColor.includes(searchTerm);

      const matchesHeadphoneType =
        !selectedHeadphoneType.length ||
        selectedHeadphoneType.includes(product?.productType);

      const matchesCompany =
        !selectedCompany.length || selectedCompany.includes(product?.brand);

      const matchesColor =
        !selectedColor.length || selectedColor.includes(product?.color);

      const matchesPrice = !selectedPrice || selectedPrice === product?.price; // Corrected the price check

      return (
        matchesSearch &&
        matchesHeadphoneType &&
        matchesCompany &&
        matchesColor &&
        matchesPrice
      );
    });
  }, [
    products,
    searchContent,
    selectedHeadphoneType,
    selectedCompany,
    selectedColor,
    selectedPrice,
  ]);

  // Sort the filtered products based on the selectedFeatured criteria
  const sortedAndFilteredProducts = useMemo(() => {
    console.log("Sorted and Filtered Products:", filteredProducts); // Log to check the sorted products
    if (filteredProducts.length > 0) {
      return [...filteredProducts].sort((a, b) => {
        if (selectedFeatured === "Price : Lowest") {
          return a.price - b.price;
        }
        if (selectedFeatured === "Name : (A-Z)") {
          return a.productName.localeCompare(b.productName);
        }
        return 0; // No sorting applied
      });
    }
    return []; // Return empty array if no filtered products
  }, [filteredProducts, selectedFeatured]);

  // Update sorted products when they change
  useEffect(() => {
    setSortedProducts(sortedAndFilteredProducts);
  }, [sortedAndFilteredProducts, setSortedProducts]);

  return (
    <div
      className={`w-screen ${
        isNightMode ? "bg-[#221128] text-white" : "bg-white text-black"
      }`}
    >
      <Banner />
      <div className="p-4">
        {width > 768 ? (
          <FilterMechanism
            setShowGrid={setShowGrid}
            showGrid={showGrid}
            className={isNightMode ? "text-white" : "text-black"}
          />
        ) : null}

        <div
          className={`mt-8 ${
            sortedProducts.length > 0
              ? showGrid
                ? `grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10 mb-3% lg:mt-8 min-h-screen`
                : `ProductHandler-List mt-8 min-h-screen`
              : "w-full"
          }`}
        >
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showGrid={showGrid}
                setSelectedProduct={setSelectedProduct}
                className={isNightMode ? "text-white" : "text-black"}
              />
            ))
          ) : (
            <div
              className={`z-10 w-full flex justify-center ${
                isNightMode ? `filter brightness-0 invert` : ``
              }`}
            >
              <img src={noproducts} className="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
