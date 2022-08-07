import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/productContext";
import { useCartContext } from "../context/cartContext";
import { useParams } from "react-router-dom";
import classes from "./Product.module.css";
import agent from "../api/agent";
import Spinner from "../components/ui/Spinner";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Alert, Rating, Snackbar } from "@mui/material";
import Navbar from "../components/layout/navbar/Navbar";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snakbarOpen, setSnakbarOpen] = useState(false);
  const { products } = useProductContext();
  const { id } = useParams();
  const { addItemToCart } = useCartContext();

  useEffect(() => {
    const savedProduct = products.find(p => p.id === +id);
    if (savedProduct) {
      setProduct(savedProduct);
      setLoading(false);
    } else {
      agent.products.getProduct(id).then(p => {
        setProduct(p);
        setLoading(false);
      });
    }
  }, [id, products, setProduct]);

  const changeCount = e => {
    const value = +e.target.value;
    setCount(value <= 0 ? "" : value);
  };

  const addHandler = () => {
    if (count) {
      addItemToCart({ product, count });
      setSnakbarOpen(true);
    }
  };

  const handleSnakbarClose = () => {
    setSnakbarOpen(false);
  };

  if (!product && !loading) return <p>Product not found</p>;

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.info}>
            <h1 className={classes.title}>{product.title}</h1>
            <p className={classes["price-text"]}>
              Price: <span className={classes["price"]}>{product.price}</span>
              &nbsp;$
            </p>
            <Rating
              className={classes.rating}
              readOnly
              value={product.rating.rate}
            />
            <p className={classes.description}>{product.description}</p>
            <input
              type="number"
              value={count}
              onChange={changeCount}
              className={classes.number}
            />
            <button className={classes.btn} onClick={addHandler}>
              <span className={classes["btn-logo"]}>
                <ShoppingCartIcon />
              </span>
              <p className={classes["btn-text"]}>Get now</p>
            </button>
          </div>
          <div className={classes.right}>
            <div className={classes["image-container"]}>
              <img src={product.image} alt={product.title} />
            </div>
          </div>
        </div>
        <Snackbar
          open={snakbarOpen}
          onClose={handleSnakbarClose}
          autoHideDuration={5000}
        >
          <Alert
            onClose={handleSnakbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This product added to cart successfully!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Product;
