import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/redux/actions/authActions";
import { useRouter } from 'next/navigation'; // Now correctly used inside a React component
import {toast} from "react-hot-toast"
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting , setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }
    setIsSubmitting(true);
    const success = await dispatch(login(email, password)); // Wait for login response
    if (success) {
     
      router.push("/dashboard"); // Redirect after successful login
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
    setIsSubmitting(false);
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
      <button
  type="submit"
  disabled={isSubmitting}
  aria-live="assertive"
  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 
           px-4 py-3.5 text-sm font-medium text-white shadow-lg
           transition-all duration-200 hover:from-sky-400 hover:to-blue-500
           disabled:opacity-50 disabled:cursor-not-allowed"
>
  <div className="relative flex items-center justify-center gap-2">
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Submitting...</span>
      </>
    ) : (
      <>
        <span>Login</span>
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </>
    )}
  </div>
</button>

      {/* <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        Login
      </button> */}
    </form>
  );
};

export default Login;
