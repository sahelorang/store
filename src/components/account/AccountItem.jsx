import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import classes from "./AccountItem.module.css";
import { Link } from "react-router-dom";
import { useAccountContext } from "../../context/accountContext";

const Account = () => {
  const { isLogin, logout } = useAccountContext();

  const logoLink = isLogin ? "/" : "/login";

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className={classes["account-icon"]}>
      <button className={classes["logo"]}>
        {isLogin ? (
          <img
            src="/assets/avatar.jfif"
            alt="avatar"
            className={classes["logo-img"]}
          />
        ) : (
          <AccountCircleOutlinedIcon fontSize="large" />
        )}
      </button>
      <div className={classes["box"]} to="/">
        <div className={classes["user"]}>
          <Link to={logoLink} className={classes["wrapper"]}>
            <div className={classes["avatar"]}>
              {isLogin ? (
                <img
                  src="/assets/avatar.jfif"
                  alt="avatar"
                  className={classes["avatar-img"]}
                />
              ) : (
                <AccountCircleOutlinedIcon
                  fontSize="large"
                  className={classes["user-icon"]}
                />
              )}
            </div>
            <p className={classes["user-name"]}>
              {isLogin ? "UserName" : "Login"}
            </p>
          </Link>
        </div>
        <div className={classes["row"]}>
          <Link className={classes["action"]} to="/">
            <MailOutlineOutlinedIcon className={classes["action-icon"]} />
            <p className={classes["action-title"]}>Club</p>
          </Link>
        </div>
        {isLogin && (
          <div className={classes["row"]}>
            <Link className={classes["action"]} to="/" onClick={logoutHandler}>
              <LogoutIcon className={classes["action-icon"]} />
              <p className={classes["action-title"]}>Log out</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
