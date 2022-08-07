import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAccountContext } from "../context/accountContext";
import classes from "./Login.module.css";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const { login ,isLogin} = useAccountContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage]=useState('');
  const history = useHistory();

  useEffect(()=>{
   if(isLogin) history.replace('/products');
  },[isLogin,history])

  const submitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(username, password);
    } catch (err) {
      setErrorMessage(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordChangeHandler = e => {
    setPassword(e.target.value);
    setErrorMessage('')
  };

  const usernameChangeHandler = e => {
    setUsername(e.target.value);
    setErrorMessage('')
  };

  return (
    <div className={classes.container}>
      <form className={classes.content} onSubmit={submitHandler}>
        <div className={classes["input-container"]}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            required
            className={`${classes.input}`}
            onChange={usernameChangeHandler}
          />
          <label className={classes.label} htmlFor="username">
            User name
          </label>
        </div>
        <div className={classes["input-container"]}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            className={`${classes.input}`}
            onChange={passwordChangeHandler}
          />
          <label className={classes.label} htmlFor="password">
            Password
          </label>
        </div>
        <p className={classes.error}>{errorMessage}</p>
        <input type="submit" value={"Login"} className={classes.btn} />

        {loading && <CircularProgress />}
      </form>)
    </div>
  );
};

export default Login;
