import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/redux/actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Call the registration API here
    dispatch(login(email, password)); // For now, logging the user in after registration
  };

  return (
    <form onSubmit={handleRegister} className="bg-[#EFE9D5] p-6 rounded-lg shadow-lg mx-auto max-w-md w-full">
      <h2 className="text-2xl text-black/50 font-semibold text-center mb-6">Register New User</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block bg-[#EFE9D5] w-full p-3 mb-4 border border-gray-300 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block bg-[#EFE9D5] w-full p-3 mb-4 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block bg-[#EFE9D5] w-full p-3 mb-4 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default Register;
