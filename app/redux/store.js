'use client'
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/reducers/authReducer';
import medicationReducer from '../redux/reducers/medicationReducer';
// import thunk from 'redux-thunk'; // Import thunk
const store = configureStore({
  reducer: {
    auth: authReducer,
    medications: medicationReducer,
  },

});

export default store;
