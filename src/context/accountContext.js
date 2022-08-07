import { createContext, useCallback, useContext, useEffect, useState } from "react";
import agent from "../api/agent";
import { EXPIRE_TIME } from "../global/config";

export const accountContext = createContext({
  isLogin: false,
  login: () => {},
  logout: () => {},
});

export const useAccountContext = () => useContext(accountContext);

let timer;

const getExpirtionTime = (minutes = 1) => {
  if (localStorage.getItem("expirtionTime"))
    return localStorage.getItem("expirtionTime");
  const now = new Date();
  return new Date(now.getTime() + minutes + 60000);
};

const AccountProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(!!token);

  const calculateRemainingTime = expirationTime => {
    const currentTime = new Date().getTime();
    const adjEcpirationTime = new Date(expirationTime).getTime();
    return adjEcpirationTime - currentTime;
  };

  
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirtionTime");
    setIsLogin(false);
    if (timer) clearTimeout(timer);
  },[]);

  const autoLogout= useCallback((expirtionTime)=>{
    const remainingTime = calculateRemainingTime(expirtionTime);
    timer = setTimeout(() => logout(), remainingTime);
  },[logout])

  const login = async (username, password) => {
    try {
      const data = await agent.account.login(username, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLogin(true);
        const expirtionTime = getExpirtionTime(EXPIRE_TIME);
        localStorage.setItem("expirtionTime", expirtionTime);
        autoLogout(expirtionTime)
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(()=>{
    if(isLogin){
      const expirtionTime = localStorage.getItem("expirtionTime");
      autoLogout(expirtionTime);
    }
  },[isLogin,autoLogout]);

  return (
    <accountContext.Provider
      value={{
        login,
        logout,
        isLogin,
      }}
    >
      {children}
    </accountContext.Provider>
  );
};

export default AccountProvider;
