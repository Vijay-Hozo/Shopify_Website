import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  increaseQuantity,
  decreaseQuantity,
  clearItem,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-dvh">
      <Navbar cartCount={cartCount} />

      <h1 className="text-2xl text-center"> Shopping Cart </h1>

      <div className="flex items-center gap-3 mt-5 m-4">
        {cart.length === 0 ? (
          <p> Your cart is empty. </p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {cart.map((item, index) => {
              const unitPrice = Number(String(item.price).replace("$", ""));
              const totalPrice = unitPrice * item.quantity;

              return (
                <div
                  key={index}
                  className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center gap-3 cursor-pointer "
                >
                  <img src={item.image} alt={item.name} className="h-[250px]" />
                  <h2> {item.name} </h2>
                  <p> {item.price} </p>

                  <div>
                    <p> Quantity: {item.quantity} </p>
                  </div>

                  <div>
                    <p> Total Price: ${totalPrice.toFixed(2)} </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Decrease Quantity
                    </Button>

                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Increase Quantity
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={() => dispatch(clearItem(item.id))}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Remove from Cart
                    </button>
                  </div>

                  <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                      Checkout
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
