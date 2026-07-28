import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log("Response: ", res.data.token);
      console.log("Response: ", res.data.user);
      if (res.data.token) {
        // localStorage.setItem("token", res.data.token);
        // localStorage.setItem("user", JSON.stringify(res.data.user));

        dispatch(
          loginSuccess({
            user: res.data.user,
            token: res.data.token,
          }),
        );
      }
      window.alert("User logged in successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
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

        <button className="w-full bg-blue-600 text-white p-2 rounded ">
          Sign In
        </button>
        <button className="w-full mt-3 bg-green-600 text-white p-2 rounded ">
          Sign In with Google
        </button>

        <h2 className="text-center my-3">or</h2>
        <h2 className="">New User?</h2>

        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-blue-600 text-white p-2 rounded "
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
