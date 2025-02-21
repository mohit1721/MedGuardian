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
    if (response.status === 200) {
        const { user, token } = response.data;
      toast.success(response.data.message);
        // Store user and token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
  
        // Dispatch loginUser action to update Redux state
        dispatch(loginUser(user));
        return true;

        // Use Next.js router to navigate (best way in Next.js 13+)
        // const router = useRouter();
        // router.push("/dashboard");
      } else {
        
        console.error("Login failed: ", response.data.message);
        return false;

      }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// Action for logging out the user
export const logout = () => (dispatch) => {
  // Remove user and token from localStorage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  toast.success("Logged out successfully")
  // Dispatch logoutUser action to update Redux state
  dispatch(logoutUser());
  
  window.location.href = "/";  // Redirect to the homepage after logout
};
