"use client"; 
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../app/redux/actions/authActions";
import Link from "next/link"; // ✅ Correct import for Next.js
import logo from "../public/logo.png"
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ Initialize useRouter

  const handleLogout = () => {
    dispatch(logout());  // Redux se logout action call karo
    router.push("/");  // ✅ Redirect to homepage after logout
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
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
