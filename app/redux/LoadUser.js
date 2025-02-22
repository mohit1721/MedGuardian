"use client"; // ✅ Runs only in the browser

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "../redux/reducers/authReducer";
import { loginUser } from "../redux/reducers/authReducer";

const LoadUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user) dispatch(loginUser(user));
    }
  }, [dispatch]);

  return null;

  // useEffect(() => {
  //   dispatch(setUserFromStorage());
  // }, [dispatch]);

  // return null;
};

export default LoadUser;
