import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const cartContext = createContext();
export const useCartContext = () => useContext(cartContext);

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [initLoad, setInitLoad] = useState(true);

  const fixPrice = price => {
    return Math.ceil(price * 100) / 100;
  };

  const save = useCallback(() => {
    if(!count){
      localStorage.removeItem("items")
      localStorage.removeItem("count")
      localStorage.removeItem("totalPrice")
      return
    }
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("count", JSON.stringify(count));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [items,count,totalPrice]);
  
  // load cart from localstorage
  useEffect(() => {
    if (localStorage.length === 0) return;
    setItems(JSON.parse(localStorage.getItem("items")));
    setCount(JSON.parse(localStorage.getItem("count")));
    setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")));
  }, []);
  
  
  useEffect(() => {
    if (!initLoad) save();
    setInitLoad(false);
  }, [totalPrice, items, initLoad,save]);
  
  const addItemToCart = newItem => {
    const eItem = items.find(item => item.product.id === newItem.product.id);
    if (eItem) {
      eItem.count += newItem.count;
    } else {
      setItems(pItems => [newItem, ...pItems]);
      setCount(p => p + 1);
    }
    setTotalPrice(pTotal => pTotal + newItem.count * newItem.product.price);
  };

  const removeItem = id => {
    const newItems = items.filter(i => i.product.id !== id);
    const removedItem = items.find(i => i.product.id === id);

    setTotalPrice(pTotal => {
      if(!newItems.length) return 0;
      const result = pTotal - removedItem.product.price * removedItem.count;
      return fixPrice(result);
    });
    setItems(newItems);
    setCount(newItems.length);
  };

  const modifyItemCount = (id, num) => {
    const item = items.find(i => i.product.id === id);
    if (item.count + num <= 0) return;
    item.count += num;
    setTotalPrice(pTotal => {
      return fixPrice(pTotal + item.product.price * num);
    });
  };

  const clearCart = useCallback(() => {
    setItems([]);
    setCount(0);
    setTotalPrice(0);
    setInitLoad(true);
  },[]);

  return (
    <cartContext.Provider
      value={{
        removeItem,
        addItemToCart,
        modifyItemCount,
        clearCart,
        items,
        count,
        totalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
