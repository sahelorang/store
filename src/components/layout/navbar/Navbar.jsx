import Account from "../../account/AccountItem";
import CartIcon from "../../cart/CartIcon";
import Search from "../../search/Search";
import classes from "./navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={classes["navbar"]}>
      <input className={classes["ckb-menu"]} id="ckb-menu" type="checkbox" />
      <label className={classes.btn} htmlFor="ckb-menu">
        <MenuIcon />
      </label>
      <div className={classes["left"]}>
        <Link to="/">
          <h1 className={classes["logo"]}>Unique</h1>
        </Link>
      </div>
      <div className={classes["center"]}></div>
      <div className={classes["right"]}>
        <Search />
        <Account />
        <CartIcon />
      </div>
      <div className={classes["mobile-menu"]}>
        <div>
          <Account />
          <p>Account</p>
        </div>
        <div>
          <CartIcon />
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
