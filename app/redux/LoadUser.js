"use client"; // ✅ Runs only in the browser

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "../redux/reducers/authReducer";

const LoadUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromStorage());
  }, [dispatch]);

  return null;
};

export default LoadUser;
