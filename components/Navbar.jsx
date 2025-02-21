"use client"; 
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../app/redux/actions/authActions";
import Link from "next/link"; // ✅ Correct import for Next.js
import logo from "../public/logo.png"
import Image from "next/image";
const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    
    // Optionally, clear user data if stored in localStorage
    localStorage.removeItem("user");
  
    // Redirect the user to the login page (or home page)
    window.location.href = "/";  // You can use router.push("/login") if you're using Next.js
  };
  

  return (
    <nav className="p-4 text-white flex justify-between items-center">
    <div className="flex flex-row justify-between items-center">
    <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
      
      <Image src={logo} width={50} height={25} alt="MedGuardian Logo"/>
      <span>MedGuardian</span>
       </Link>
    </div>
   
      <div>
        <Link href="/dashboard" className="mr-4">Dashboard</Link>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
