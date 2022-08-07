import React from "react";
import { useProductContext } from "../../../context/productContext";
import classes from "./Menu.module.css";
import Spinner from "../../ui/Spinner";
import MenuItem from "./MenuItem";

const Menu = () => {
  const {
    categories,
    isCategoriesLoading,
  } = useProductContext();

  return (
    <div className={classes.menu}>
      {isCategoriesLoading ? <Spinner /> : categories.map((ctg,i) =><MenuItem key={i} name={ctg}>{ctg}</MenuItem>)}
    </div>
  );
};

export default Menu;
