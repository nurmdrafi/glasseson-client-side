import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuthUserContext from "../context/AuthUserContext";

const logout = async () => {
  const res = await axios.delete("/auth/logout");
  return res.data;
};

const useRefreshToken = () => {
  const { setAuthUser } = useAuthUserContext();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const res = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });
      setAuthUser({
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
        accessToken: res.data.accessToken,
      });
      return res.data.accessToken;
    } catch (error) {
      const res = await logout();
      if (res) {
        setAuthUser(null);
        localStorage.setItem("isLoggedIn", false);
        navigate("/login");
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
