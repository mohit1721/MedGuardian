// "use client"; 
// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     isAuthenticated: !!localStorage.getItem('user'),
//   },
//   reducers: {
//     loginUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       localStorage.setItem('user', JSON.stringify(action.payload));
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('user');
//     },
//   },
// });

// export const { loginUser, logoutUser } = authSlice.actions;
// export default authSlice.reducer;
// **
// "use client"; // ✅ Ensure it's a client-side file

// import { createSlice } from "@reduxjs/toolkit";

// const getUserFromStorage = () => {
//   if (typeof window !== "undefined") {
//     return JSON.parse(localStorage.getItem("user")) || null;
//   }
//   return null;
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: getUserFromStorage(),
//     isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("user"),
//   },
//   reducers: {
//     loginUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       if (typeof window !== "undefined") {
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       }
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("user");
//       }
//     },
//   },
// });

// export const { loginUser, logoutUser } = authSlice.actions;
// export default authSlice.reducer;
// // ***---
"use client"; // ✅ Ensures this runs only on the client

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

// Create a slice with reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    setUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { loginUser, logoutUser, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
