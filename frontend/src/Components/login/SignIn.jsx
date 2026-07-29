import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get("returnTo") || "/";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (res.data.token) {
        dispatch(
          loginSuccess({
            user: res.data.user,
            token: res.data.token,
          })
        );
      }
      window.alert("User logged in successfully");
      navigate(returnTo, { replace: true });
    } catch (err) {
      console.log(err);
      window.alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-semibold text-center"> Sign In</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
          Sign In
        </button>
        <button type="button" className="w-full mt-3 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors">
          Sign In with Google
        </button>

        <h2 className="text-center my-3">or</h2>
        <h2 className="mb-2 text-sm text-gray-600">New User?</h2>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
