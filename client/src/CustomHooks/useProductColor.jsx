import { useMemo } from "react";

const useProductColor = (color) => {
  return useMemo(() => {
    const productColor = color.toLowerCase();
    const lightColors = ["white", "silver", "yellow"];
    return {
      background: productColor,
      color: lightColors.includes(productColor) ? "black" : "white",
    };
  }, [color]);
};

export default useProductColor;
