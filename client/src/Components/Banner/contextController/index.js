import { useNightModeContext } from "../../../Contexts/OtherCommonContext/NightModeContext";
import { useProducts } from "../../../Contexts/Products/Products";

const useContextController = () => {
  const { isNightMode, toggleNightMode } = useNightModeContext();
  const { products, setProducts, searchContent, setSearchContent } =
    useProducts();

  return {
    isNightMode,
    toggleNightMode,
    products,
    setProducts,
    searchContent,
    setSearchContent,
  };
};

export default useContextController;
