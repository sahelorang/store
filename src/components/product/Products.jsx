import React from "react";
import { useProductContext } from "../../context/productContext";
import classes from "./Products.module.css";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import Error from "../error/Error";
import Item from "./Item";
import { useEffect } from "react";

const Products = () => {
  const {
    products,
    isProductsLoading,
    page,
    lastPage,
    handlePageBack,
    handlePageNext,
    loadProducts,
    errorMessage,
  } = useProductContext();

  useEffect(()=>{
    loadProducts();
  },[loadProducts])

  if (errorMessage) return <Error message={errorMessage} style={{height:'90vh'}} />;

  return (
    <div className={classes.container}>
      {isProductsLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={classes.products}>
            {products.map(product => (
              <Item product={product} key={product.id} />
            ))}
          </div>
          <div className={classes.btns}>
            <Button
              onClick={handlePageBack}
              extraClass={page === 1 ? "disable" : ""}
            >
              Back
            </Button>
            <Button
              onClick={handlePageNext}
              extraClass={page === lastPage ? "disable" : ""}
              style={{ marginLeft: "2rem" }}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Products);
