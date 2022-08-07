import { Rating } from "@mui/material";
import React from "react";
import classes from "./Item.module.css";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  const {
    id,
    image,
    title,
    price,
    rating: { rate },
  } = product;

  return (
    <div className={classes.item}>
      <div className={classes.image}>
        <img src={image} alt={title} />
      </div>
      <p className={classes.title}>{title}</p>
      <Rating name="read-only" value={rate} readOnly />
      <p className={classes["price-text"]}>
        from: <span className={classes.price}>{price}</span>
      </p>
      <Link to={`/products/${id}`} className={classes.link}/>
    </div>
  );
};

export default Item;
