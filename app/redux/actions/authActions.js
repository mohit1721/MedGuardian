"use client";

import axios from "axios";
import { loginUser, logoutUser } from "../reducers/authReducer";
import { toast } from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://medguardianbe.onrender.com/api";

// Action for logging in the user
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    if (response.data.success) {
      const { user, token } = response.data;
      toast.success(response.data.message);
      
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

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

// Register User Action
export const register = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    
    if (data.success) {
      return { success: true };
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed!");
    return { success: false, message: error?.response?.data?.message || "Registration failed!" };
  }
};

// Action for logging out the user
export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  dispatch(logoutUser());
  toast.success("Logged out successfully!");
};
