import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    dispatch(logout());
    window.alert("User logged out successfully");
    navigate("/signin");
  };

  return (
    <nav className="bg-blue-600 text-white py-3.5 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-2xl font-extrabold uppercase tracking-wide group-hover:text-blue-200 transition">
            Shopify
          </span>
          {isAdmin && (
            <span className="bg-amber-400 text-blue-950 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Admin
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-base">
          <li 
            onClick={() => navigate("/")} 
            className={`cursor-pointer hover:text-blue-200 transition ${location.pathname === '/' ? 'underline font-semibold' : ''}`}
          >
            Home
          </li>

          {user && !isAdmin && (
            <li 
              onClick={() => navigate("/orders")} 
              className={`cursor-pointer hover:text-blue-200 transition ${location.pathname === '/orders' ? 'underline font-semibold' : ''}`}
            >
              📦 My Orders
            </li>
          )}

          {/* Product button specifically for ADMIN alone */}
          {isAdmin && (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => navigate("/admin/products")} 
                className={`cursor-pointer bg-amber-400 hover:bg-amber-300 text-blue-950 px-3.5 py-1 rounded-lg font-bold transition flex items-center gap-1.5 shadow-sm ${
                  location.pathname === '/admin/products' ? 'ring-2 ring-white' : ''
                }`}
              >
                <span>⚙️</span> Products
              </div>

              <div 
                onClick={() => navigate("/admin/orders")} 
                className={`cursor-pointer bg-amber-400 hover:bg-amber-300 text-blue-950 px-3.5 py-1 rounded-lg font-bold transition flex items-center gap-1.5 shadow-sm ${
                  location.pathname === '/admin/orders' ? 'ring-2 ring-white' : ''
                }`}
              >
                <span>📦</span> Order Management
              </div>
            </div>
          )}

          <li 
            onClick={() => navigate("/")} 
            className="cursor-pointer hover:text-blue-200 transition"
          >
            About
          </li>
          <li 
            onClick={() => navigate("/")} 
            className="cursor-pointer hover:text-blue-200 transition"
          >
            Contact
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Admin Products Button */}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin/products")}
              className="md:hidden bg-amber-400 text-blue-950 font-bold py-1 px-2.5 rounded-lg text-xs"
            >
              Admin Products
            </button>
          )}

          {user ? (
            <div 
              onClick={() => navigate("/profile")}
              className={`flex items-center gap-1.5 bg-blue-700/80 hover:bg-blue-800 text-white px-3 py-1 rounded-lg border border-blue-400/40 cursor-pointer transition shadow-sm group ${
                location.pathname === '/profile' ? 'ring-2 ring-white font-bold' : ''
              }`}
              title="View Profile"
            >
              <span className="text-xs">👤</span>
              <span className="font-semibold text-sm max-w-[120px] truncate group-hover:underline">
                {user.name || "User"}
              </span>
            </div>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-white text-blue-700 font-semibold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition text-sm shadow-sm"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-1.5 px-3 rounded-lg transition text-sm flex items-center gap-1"
          >
            🛒 Cart ({cartCount})
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-3 rounded-lg transition text-sm shadow-sm"
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
