import React from "react";
import { Link } from "react-router-dom";
import classes from "./ProductItem.module.css";

const ProductItem = ({ product: { id, image, price, title } }) => {
  
  return (
    <div className={classes.product}>
      <img className={classes["product__img"]} src={image} alt={title} />
      <p className={classes["product__title"]}>{title}</p>
      <div className={classes["product__buy"]}>
        <span className={classes["product__cost"]}>{price}$</span>
        <Link to={`/products/${id}`} className={classes["product__btn"]}>Buy</Link>
      </div>
    </div>
  );
};

export default ProductItem;
