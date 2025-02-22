"use client"; 

import axios from "axios";
import { loginUser, logoutUser } from "../reducers/authReducer";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast"

// Action for logging in the user
export const login = (email, password) => async (dispatch) => {
  try {
    // API call to authenticate user and get JWT token
    const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    if (response.data.success) {
        const { user, token } = response.data;
      toast.success(response.data.message);
        // Store user and token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
  
        // Dispatch loginUser action to update Redux state
        dispatch(loginUser(user));
        return true;

      } else {
        
        toast.error(response?.data?.message || "Login failed!");
        return false;

      }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed!");
    console.log("Error logging in:", error);
  }
};
// ✅ Register User Action
export const register = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });

    // console.log("User created:", data);
    
    if (data.success) {
      // toast.success(data.message);
      return { success: true }; // Returning object for better handling
    }
  } catch (error) {
    // console.error("Registration error:", error?.response?.data);
    toast.error(error?.response?.data?.message || "Registration failed!");
    
    return { success: false, message: error?.response?.data?.message || "Registration failed!" };
  }
};
// Action for logging out the user
export const logout = () => (dispatch) => {
  // const router = useRouter();

  // Local Storage se token hatao
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  // Redux state update karo
  dispatch(logoutUser());

  // Success message dikhana
  toast.success("Logged out successfully!");

 
};