import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="flex justify-between items-center px-3">
        <h1 className="font-bold uppercase text-xl">Shopify</h1>

        {/* <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Open
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}

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
          <button onClick={() => navigate("/signup")} className="bg-gray-100 text-blue-800 font-semibold py-1 px-2 rounded-lg mr-2">
            Sign Up
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-100 text-blue-800 font-semibold py-1 px-2 rounded-lg"
          >
            Cart : {cartCount}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
