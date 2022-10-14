import React, { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";

const AuthUserContext = createContext();

export const AuthUserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // regenerate new token onMount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const refresh = async () => {
      try {
        const res = await axios.get("/auth/reload", {
          withCredentials: true,
        });
        if (res) {
          setAuthUser({
            username: res.data.username,
            email: res.data.email,
            role: res.data.role,
            accessToken: res.data.accessToken,
          });
          navigate("/");
        }
      } catch (err) {
        const res = await axios.delete("/auth/logout");
        if (res) {
          setAuthUser(null);
          localStorage.setItem("isLoggedIn", false);
          navigate("/login");
        }
      }
    };
    if (isLoggedIn === true) {
      refresh();
    }
  }, []);

  console.log(authUser);
  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

const useAuthUserContext = () => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw Error(
      "useAuthUserContext must be used within a AuthUserContextProvider"
    );
  }
  return context;
};
export default useAuthUserContext;
