import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. Create a state variable for each input field
  // 2. Use that state variable as the value of the input field
  // 3. Create a handleSubmit function for that form
  // 4. Make axios post request to the backend with the input field values

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name: username,
        email,
        password,
      });

      const userPayload = response.data.user || response.data.newuser;
      if (response.data.token) {
        dispatch(
          loginSuccess({
            user: userPayload,
          }),
        );
      }
      localStorage.setItem("token", response.data.token);
      window.alert("User registered successfully");
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
        <h1 className="text-2xl font-semibold text-center"> Sign Up</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          Sign Up
        </button>
        <button type="button" className="w-full mt-3 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors">
          Sign Up with Google
        </button>

        <h2 className="text-center my-3">or</h2>
        <h2 className="mb-2 text-sm text-gray-600">Existing User?</h2>

        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
