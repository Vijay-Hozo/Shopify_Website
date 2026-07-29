import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const { user } = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);
  console.log("User in Navbar: ", user);
  console.log("Token in Navbar: ", token);

  // const token = localStorage.getItem("token");
  // console.log("Token in Navbar: ", token);

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("User in Navbar: ", user);

  // setItem, getItem, removeItem - localStorage

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    dispatch(logout());
    window.alert("User logged out successfully");
    navigate("/signin");
  };
  const cart = useSelector((state) => state.cart.items);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-bold uppercase text-xl">Shopify</h1>

        <ul className="flex gap-4 font-semibold text-lg cursor-pointer ">
          <li className="hover:underline transition duration-300 hover:scale-125 ">
            Home
          </li>
          <li className="hover:underline transition duration-300 hover:scale-125 ">
            Product
          </li>
          <li className="hover:underline transition duration-300 hover:scale-125 ">
            About
          </li>
          <li className="hover:underline transition duration-300 hover:scale-125 ">
            Contact
          </li>
        </ul>

        <div>
          {user ? (
            <button className="bg-gray-100 text-blue-800 font-semibold py-1 px-2 rounded-lg mr-2">
              {" "}
              {user.name || "User"} {/* Display the user's name */}
              {/* profile */}
            </button>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="bg-gray-100 text-blue-800 font-semibold py-1 px-2 rounded-lg mr-2"
            >
              Sign Up
            </button>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-100 text-blue-800 font-semibold py-1 px-2 rounded-lg mr-2"
          >
            Cart : {cartCount}
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold py-1 px-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
