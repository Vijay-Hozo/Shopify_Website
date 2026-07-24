import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center"> Sign In</h1>


        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded ">
          Sign In
        </button>
        <button className="w-full mt-3 bg-green-600 text-white p-2 rounded ">
          Sign In with Google
        </button>

        <h2 className="text-center my-3">or</h2>
        <h2 className="">New User?</h2>

        <button onClick = {() => navigate("/signup")} className="w-full bg-blue-600 text-white p-2 rounded ">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
