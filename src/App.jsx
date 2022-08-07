import ProductProvider from "./context/productContext";
import CartProvider from "./context/cartContext";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Product from "./pages/Product";
import Cart from "./pages/cart/Cart";
import Login from "./pages/Login";
import AccountProvider from "./context/accountContext";

const App = () => {
  return (
    <ProductProvider>
        <CartProvider>
      <AccountProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/products">
              <ProductsPage />
            </Route>
            <Route path="/products/:id">
              <Product />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">not found</Route>
          </Switch>
      </AccountProvider>
        </CartProvider>
    </ProductProvider>
  );
};

export default App;
