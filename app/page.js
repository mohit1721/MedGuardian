'use client';

import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Overlay for darkened background */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-extrabold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to MedGuardian
        </h1>
        <p className="text-xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Track your medications, never miss a dose!
        </p>

        {/* Toggle buttons */}
        <div className="mb-8 animate__animated animate__fadeIn animate__delay-3s">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-3 text-lg font-semibold border-none rounded-l-lg transition-all duration-300 ${
              isLogin ? "bg-blue-700 text-white" : "bg-transparent text-white border-2 border-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-3 text-lg font-semibold border-none rounded-r-lg transition-all duration-300 ${
              !isLogin ? "bg-blue-700 text-white" : "bg-transparent text-white border-2 border-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Toggle */}
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default HomePage;
