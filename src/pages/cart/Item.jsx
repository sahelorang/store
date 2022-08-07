import { useCartContext } from "../../context/cartContext";
import classes from "./Item.module.css";

const Item = ({ item: { product, count } }) => {
  const { removeItem, modifyItemCount } = useCartContext();
  const { id, title, price, category, image } = product;

  return (
    <div className={classes.item}>
      <div className={classes["image-container"]}>
        <img className={classes.img} src={image} alt={title} />
      </div>
      <div className={classes.info}>
        <p className={classes.title}>{title}</p>
        <span className={classes.category}>{category}</span>
      </div>
      <div className={classes["quantity-container"]}>
        <button
          className={classes["btn-quantity"]}
          onClick={() => modifyItemCount(id, -1)}
        >
          -
        </button>
        <span className={classes.quantity}>{count}</span>
        <button
          className={classes["btn-quantity"]}
          onClick={() => modifyItemCount(id, 1)}
        >
          +
        </button>
      </div>
      <div className={classes["price-container"]}>
        <span className={classes.price}>{price} $</span>
      </div>
      <div className={classes["btn-container"]}>
        <button
          onClick={() => {
            removeItem(id);
          }}
          className={classes["btn-del"]}
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default Item;
