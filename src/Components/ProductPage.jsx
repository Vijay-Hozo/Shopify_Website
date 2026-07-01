import React, { useState } from "react";
import Navbar from "./Navbar";

// {addToCart} is a prop that is passed from the parent component (App.jsx) to the child component (ProductPage.jsx). It is a function that allows the ProductPage component to add products to the cart in the parent component's state. When a user clicks the "Add to Cart" button for a product, the addToCart function is called with the product as an argument, which updates the cart state in App.jsx.
const ProductPage = () => {

  const [cart, setCart] = useState([]);
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/LjFB6lsscXfeLNIfhM5v5P4AxB9596G4oUciTxZyfoE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzEv/MjAyLzI5MC9zbWFs/bC9tb2Rlcm4td2hp/dGUtc2xpbS13aXJl/bGVzcy1oZWFkcGhv/bmVzLXdpdGgtc2ls/dmVyLWRldGFpbHMt/cGhvdG8uanBn",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/aSdZ2e5S0E8g_aUn-KxgBmrkMpf7V5IqO1D1w3OhULQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjgv/NzY3LzEzOC9zbWFs/bC93aXJlbGVzcy1o/ZWFkcGhvbmVzLW9u/LW5ldXRyYWwtYmFj/a2dyb3VuZC1tb2Rl/cm4tYXVkaW8tdGVj/aG5vbG9neS1mb3It/bXVzaWMtYW5kLXBv/ZGNhc3RzLWNvbWZv/cnRhYmxlLWxpc3Rl/bmluZy1leHBlcmll/bmNlLXBob3RvLmpw/Zw",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/d81cAP2qU4OW14YGuTa-2kAyYQ4xDOT2o9G75aYzhQE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDkwODEyMTkwOTAt/YTZkODFkMzA4NWJm/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZhdXRv/PWZvcm1hdCZmaXQ9/Y3JvcCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE1UaDhmR2hsWVdS/d2FHOXVaWE44Wlc1/OE1IeDhNSHg4ZkRB/PQ",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/RRlhXg3iN0FTwcTFemU-w49ZUQTmE-BxufTIu7VEbwQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDcv/MTE4LzE3My9zbWFs/bC9zaW5nbGUtYmxh/Y2stYmx1ZXRvb3Ro/LXdpcmVsZXNzLWhl/YWRwaG9uZXMtcGhv/dG8uanBn",
    },
    {
      id: 5,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/5JajwzYL89sSr9w8axXDir6Nbc7KNj_YR7gdG7zGo_Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzkv/MjI3LzExMi9zbWFs/bC93aXJlbGVzcy1o/ZWFkcGhvbmVzLWFu/ZC1oZWFkcGhvbmVz/LXdpdGgtd2lyZXMt/cGhvdG8uSlBH",
    },
    {
      id: 6,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/5JajwzYL89sSr9w8axXDir6Nbc7KNj_YR7gdG7zGo_Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzkv/MjI3LzExMi9zbWFs/bC93aXJlbGVzcy1o/ZWFkcGhvbmVzLWFu/ZC1oZWFkcGhvbmVz/LXdpdGgtd2lyZXMt/cGhvdG8uSlBH",
    },
    {
      id: 7,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/p69wpFCwDzQmFRGqq8B0vdxKOxW0SXNt7-7zh0qNtRA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/NTg2MzE4NS9waG90/by93aXJlbGVzcy1o/ZWFkcGhvbmVzLW9u/LWJyaWdodC1iYWNr/Z3JvdW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1ZX2Iw/clM2X0dRVFg3MkJJ/VGdUZkt5V0ZjNTg3/ZkNrWWQzUnBhUFl1/azNzPQ",
    },
    {
      id: 8,
      name: "Wireless Headphones",
      price: "$10.19",
      image:
        "https://imgs.search.brave.com/sGdmydw5JKmLHaB0WrXTwVuoiLocbuewZhdW3ZSn53Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDIv/NjQxLzU4OS9zbWFs/bC93aXJlbGVzcy1o/ZWFkcGhvbmVzLW9u/LXdoaXRlLXBob3Rv/LmpwZw",
    },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <section className="bg-gray-100 px-3 py-5">
        <h1 className="text-xl font-semibold text-center mb-4">Our Products</h1>

        <div className="grid grid-cols-5 gap-4">
          {products.map((prod) => {
            return (
              <div
                key={prod.id}
                className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition duration-300"
              >
                <img src={prod.image} alt={prod.name} className="h-[230px]" />

                <div className="flex flex-col items-center gap-2">
                  <h2>{prod.name}</h2>
                  <p>{prod.price}</p>
                </div>

                <button onClick={() => addToCart(prod)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
