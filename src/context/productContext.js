import { createContext, useCallback, useContext, useState } from "react";
import agent from "../api/agent";

export const productContext = createContext();

export const useProductContext = () => useContext(productContext);

const ProductProvider = props => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [productPerPage, setProductPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const setNumberOfLastPage = useCallback(
    num => {
      setLastPage(Math.ceil(num / productPerPage));
    },
    [setLastPage, productPerPage]
  );

  const loadProducts = useCallback(async () => {
    if(products.length) return;
    setIsProductsLoading(true);
    try {
      const data = await agent.products.list();
      setIsProductsLoading(false);
      setProducts(data);
      setNumberOfLastPage(data.length);
      setPage(1);
    } catch (err) {
      setErrorMessage(`${err}`);
      console.error(err);
    }
  }, [setNumberOfLastPage,products.length]);

  const loadCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    const newCategories = await agent.categories.getCategoryList();
    setIsCategoriesLoading(false);
    setCategories(newCategories);
  }, []);

  function handlePageBack() {
    if (page !== 1) setPage(p => p - 1);
  }
  function handlePageNext() {
    if (page < lastPage) setPage(p => p + 1);
  }
  const handleLoading = useCallback(loadingStatus => {
    setIsProductsLoading(loadingStatus);
  }, []);

  const loadProductsByCategory = useCallback(
    async categoryName => {
      setIsProductsLoading(true);
      const newProducts = await agent.categories.getCategory(categoryName);
      setIsProductsLoading(false);
      setProducts(newProducts);
      setNumberOfLastPage(newProducts.length);
      setPage(1);
    },
    [setNumberOfLastPage]
  );

  const getLatestProducts = useCallback(async limit => {
    return await agent.products.getProductsByLimit(limit);
  }, []);

  return (
    <productContext.Provider
      value={{
        products: products.slice(
          (page - 1) * productPerPage,
          page * productPerPage
        ),
        isProductsLoading,
        isCategoriesLoading,
        categories,
        productPerPage,
        lastPage,
        page,
        errorMessage,
        setProductPerPage,
        loadProducts,
        loadCategories,
        loadProductsByCategory,
        handlePageBack,
        handlePageNext,
        handleLoading,
        getLatestProducts,
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductProvider;
