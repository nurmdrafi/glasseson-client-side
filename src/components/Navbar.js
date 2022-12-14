import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthUserContext from "../context/AuthUserContext";
import toast from "react-hot-toast";
import axios from "../api/axios";
import { useQueryClient } from "react-query";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuthUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    const res = await axios.delete("/auth/logout");
    return res.data;
  };
  const handleLogOut = async () => {
    try {
      const res = await logout();
      if (res) {
        // queryClient.removeQueries("");
        setAuthUser(null);
        localStorage.setItem("isLoggedIn", false);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        id: "logOut error",
      });
    }
  };
  return (
    <div className="navbar lg:px-16 px-12 h-[65px]">
      <div className="flex-1">
        <Link className="text-4xl font-bold text-primary" to="/">
          <div>
            <p className="font-['Comforter_Brush']">
              Glasses<span className="font-normal">On</span>
            </p>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        {/* logout button */}
        <div className="flex items-center gap-2 text-black">
          {authUser?.email && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full shadow-md bg-primary">
                  {authUser.username && (
                    <span className="text-2xl pt-1 flex justify-center items-center text-white">
                      {authUser.username[0]}
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button
                    className="btn btn-primary text-white"
                    onClick={handleLogOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
