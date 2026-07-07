import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

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

        <button
          onClick={() => navigate("/cart")}
          className="bg-gray-100 text-blue-800 font-semibold py-1 px-2 rounded-lg"
        >
          Cart : {cartCount}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
