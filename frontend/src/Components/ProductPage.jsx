import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin";
  const userToken = token || localStorage.getItem("token");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}products`);
      if (resp.data.success) {
        setProducts(resp.data.products || []);
      } else {
        setProducts(resp.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}products/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.data.success) {
        window.alert("Product deleted successfully");
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      window.alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Our Products</h1>
          {isAdmin && (
            <button
              onClick={() => navigate("/admin/products")}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
            >
              <span>⚙️</span> Manage Products (Admin)
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => {
              const id = prod._id || prod.id;
              return (
                <div
                  key={id}
                  className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition duration-300 border border-gray-100"
                >
                  <div>
                    <div className="h-48 overflow-hidden rounded-lg mb-3 bg-gray-50 flex items-center justify-center">
                      <img
                        src={prod.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"}
                        alt={prod.title}
                        className="h-full w-full object-cover hover:scale-105 transition duration-300"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-1 mb-4">
                      <h2 className="font-bold text-gray-800 text-lg line-clamp-1">{prod.title}</h2>
                      <p className="text-gray-500 text-xs line-clamp-2">{prod.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-extrabold text-blue-600 text-lg">${prod.price}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                          Stock: {prod.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => dispatch(addToCart(prod))}
                      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Add to Cart
                    </button>

                    {/* Admin Alone Controls */}
                    {isAdmin && (
                      <div className="flex gap-2 pt-1 border-t border-gray-100">
                        <button
                          onClick={() => navigate("/admin/products")}
                          className="flex-1 bg-amber-100 text-amber-800 hover:bg-amber-200 font-semibold py-1.5 rounded-lg text-xs transition"
                        >
                          Edit (Admin)
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(id)}
                          className="flex-1 bg-red-100 text-red-800 hover:bg-red-200 font-semibold py-1.5 rounded-lg text-xs transition"
                        >
                          Delete (Admin)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
