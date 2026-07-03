import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Navbar from "./Components/Navbar";
import ProductPage from "./Components/ProductPage";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  console.log(cart);
  console.log("cart length :", cart.length);

  // initially, the cart is empty, so we can display a message or an empty cart icon. When a product is added to the cart, we can update the cart state and display the number of items in the cart.

  return (
    <>
      <BrowserRouter>
        {/* props here App.jsx is parent and Navbar and Product Page is child (props) */}
        {/* <Navbar cartCount={cart.length} /> */}
        <Routes>
          <Route path = "/" element = {<ProductPage addToCart={addToCart} cart={cart} />} />
          <Route path = "/cart" element = {<Cart cart={cart} setCart={setCart} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
