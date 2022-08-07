import React from "react";
import { useHistory } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import classes from "./CartIcon.module.css";
import { useCartContext } from "../../context/cartContext";

const CartIcon = () => {
  const { count } = useCartContext();
  const history = useHistory();
  const pushToCart = () => history.push("/cart");

  return (
    <button className={classes["icon"]} onClick={pushToCart}>
      <ShoppingCartOutlined className={classes["logo"]} />
      {count > 0 && <span className={classes.counter}>{count}</span>}
    </button>
  );
};

export default CartIcon;
