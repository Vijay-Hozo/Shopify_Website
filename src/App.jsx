import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Navbar from "./Components/Navbar";
import ProductPage from "./Components/ProductPage";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";

function App() {
  // const [cart, setCart] = useState([]);

  // const addToCart = (product) => {
  //   setCart((prevCart) => [...prevCart, product]);
  // };

  //  console.log(cart);
  //  console.log("cart length :",cart.length);

  // initially, the cart is empty, so we can display a message or an empty cart icon. When a product is added to the cart, we can update the cart state and display the number of items in the cart.

  return (
    <>

    {/* props here App.jsx is parent and Navbar and Product Page is child (props) */}
      {/* <Navbar cartCount={cart.length} /> */}
      <ProductPage addToCart={addToCart} />
      <Footer />
      <Cart />
    </>
  );
}

export default App;
