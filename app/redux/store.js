'use client'
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit"; // ✅ Combined Reducer

import storage from "redux-persist/lib/storage"; // ✅ LocalStorage use karne ke liye
import { persistStore, persistReducer } from "redux-persist";
import authReducer from '../redux/reducers/authReducer';
import medicationReducer from '../redux/reducers/medicationReducer';
// ✅ Persist config
const persistConfig = {
  key: "root",
  storage,
};
// ✅ Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
  medications: medicationReducer,
});
// ✅ Wrap Reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// ✅ Wrap reducers with persistReducer
// const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedMedicationReducer = persistReducer(persistConfig, medicationReducer);
const store = configureStore({
  // reducer: {
  //   auth: persistedAuthReducer,
  //   medications: persistedMedicationReducer,
  // },
reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fix for non-serializable errors
    }),
});
export const persistor = persistStore(store);
export default store;
