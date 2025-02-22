import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/redux/actions/authActions";
import { useRouter } from 'next/navigation'; // Now correctly used inside a React component
import {toast} from "react-hot-toast"
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }
    const success = await dispatch(login(email, password)); // Wait for login response
    if (success) {
      router.push("/dashboard"); // Redirect after successful login
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-[#EFE9D5] text-black/50 p-6 rounded-lg shadow-lg mx-auto max-w-md w-full">
      <h2 className="text-2xl text-black/50 font-semibold text-center mb-6">Welcome Back !</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block bg-[#EFE9D5] text-black/50 w-full p-3 mb-4 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block bg-[#EFE9D5] w-full p-3 text-black mb-4 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default Login;
