import Content from "../../components/ui/Content";
import classes from "./Cart.module.css";
import Footer from "../../components/layout/Footer";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import Item from "./Item";
import Navbar from "../../components/layout/navbar/Navbar";
import { useAccountContext } from "../../context/accountContext";

const Cart = () => {
  const { items, totalPrice } = useCartContext();
  const { token } = useAccountContext();

  return (
    <>
      <Navbar />
      <Content>
        <div className={classes.container}>
          <div className={classes.left}>
            {items.length === 0 ? (
              <p>No Item Selected!</p>
            ) : (
              items.map(item => <Item key={item.product.id} item={item} />)
            )}
          </div>
          <div className={classes.right}>
            <div className={classes["total-price"]}>
              <p>Total price:&nbsp;</p>
              <span>{totalPrice}$</span>
            </div>
            {token ? (
              <Link to="#" className={classes["btn-continue"]}>
                Continue
              </Link>
            ) : (
              <Link to="/login" className={classes["btn-login"]}>
                Login
              </Link>
            )}
          </div>
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default Cart;