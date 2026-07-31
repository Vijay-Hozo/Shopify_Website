import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const AdminProducts = () => {
  // 1. Create a state variable for each input field and products list
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      const resp = await axios.get("http://localhost:3000/products");
      console.log("Products fetched: ", resp);
      setProducts(resp.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add or Edit Product Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      if (editId) {
        // Edit existing product
        const response = await axios.put(
          `http://localhost:3000/products/${editId}`,
          {
            title,
            description,
            price: Number(price),
            quantity: Number(quantity),
            image,
            category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Updated product response:", response.data);
        window.alert("Product updated successfully!");
        setEditId(null);
      } else {
        // Add new product
        const response = await axios.post(
          "http://localhost:3000/create",
          {
            title,
            description,
            price: Number(price),
            quantity: Number(quantity),
            image,
            category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Created product response:", response.data);
        window.alert("Product created successfully!");
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImage("");
      setCategory("");

      fetchProducts();
    } catch (err) {
      console.log(err);
      window.alert(err.response?.data?.message || "Operation failed");
    }
  };

  // Populate state fields when clicking edit button
  const handleEditClick = (prod) => {
    setEditId(prod._id || prod.id);
    setTitle(prod.title || "");
    setDescription(prod.description || "");
    setPrice(prod.price || "");
    setQuantity(prod.quantity || "");
    setImage(prod.image || "");
    setCategory(prod.category || "");
  };

  // Delete product API call
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Delete response:", response.data);
      window.alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.log(err);
      window.alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setImage("");
    setCategory("");
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-4">Admin Product Management</h1>

        {/* Form to Add or Edit Product */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8 border"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            {editId ? "Edit Product" : "Add New Product"}
          </h2>

          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Product Title"
            className="w-full border p-2 mb-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Product Description"
            className="w-full border p-2 mb-3 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="price" className="block font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                className="w-full border p-2 mb-3 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="quantity" className="block font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Quantity"
                className="w-full border p-2 mb-3 rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
          </div>

          <label htmlFor="image" className="block font-medium mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            placeholder="Image URL"
            className="w-full border p-2 mb-3 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            placeholder="Category"
            className="w-full border p-2 mb-4 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              {editId ? "Update Product" : "Add Product"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-500 text-white p-2 rounded font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* View All Products List */}
        <h2 className="text-xl font-bold mb-4">All Products ({products.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((prod) => {
            const id = prod._id || prod.id;
            return (
              <div
                key={id}
                className="bg-white p-4 rounded-lg shadow-md border flex flex-col justify-between"
              >
                <div>
                  <img
                    src={prod.image || "https://via.placeholder.com/150"}
                    alt={prod.title}
                    className="h-44 w-full object-cover rounded mb-2"
                  />
                  <h3 className="font-bold text-lg">{prod.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{prod.description}</p>
                  <p className="font-semibold text-blue-600">Price : ${prod.price}</p>
                  <p className="text-sm text-gray-500">Quantity : {prod.quantity}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(prod)}
                    className="flex-1 bg-yellow-500 text-white py-1 rounded font-semibold hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(id)}
                    className="flex-1 bg-red-600 text-white py-1 rounded font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminProducts;
