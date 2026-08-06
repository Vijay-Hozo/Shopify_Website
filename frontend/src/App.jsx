import "./App.css";
import ProductPage from "./Components/ProductPage";
import Cart from "./Components/Cart";
import AdminProducts from "./Components/AdminProducts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/login/SignUp";
import SignIn from "./Components/login/SignIn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { loginSuccess, logout } from "./features/user/userSlice";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import Checkout from "./Components/Checkout";
import OrderPage from "./Components/OrderPage";
import ProfilePage from "./Components/ProfilePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success && res.data.user) {
          dispatch(
            loginSuccess({
              user: res.data.user,
              token: token,
            }),
          );
        }
      } catch (err) {
        console.log(err);
        dispatch(logout());
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element= {<Checkout />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<OrderPage />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
