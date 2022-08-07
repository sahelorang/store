import React, { useEffect, useState } from "react";
import { useProductContext } from "../../context/productContext";
import BtnLink from "../ui/BtnLink";
import Spinner from "../ui/Spinner";
import classes from "./NewProducts.module.css";
import Row from "../ui/Row";
import Item from '../product/Item';

const NewProducts = ({ title, text }) => {
  const { getLatestProducts } = useProductContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(products.length) {
      setLoading(false);
      return;
    }
    (async function () {
      try {
        const data = await getLatestProducts(4)
        setProducts(data);
      } catch (err) {
        console.error(err);
      }finally{
        setLoading(false);        
      }
    })();
  }, [getLatestProducts,products]);

  return (
    <div className={classes["new-products"]}>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.text}>{text}</p>
      {loading ? <Spinner /> : <Row>{products.map((p)=><Item product={p} key={p.id}/>)}</Row>}
      <div className={classes["btn-container"]}>
      <BtnLink to='/products' className={classes['btn-link']} >Explore all products</BtnLink>
      </div>
    </div>
  );
};

export default NewProducts;
