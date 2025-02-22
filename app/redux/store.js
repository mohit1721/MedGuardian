'use client'
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage"; // ✅ LocalStorage use karne ke liye
import { persistStore, persistReducer } from "redux-persist";
import authReducer from '../redux/reducers/authReducer';
import medicationReducer from '../redux/reducers/medicationReducer';
// ✅ Persist config
const persistConfig = {
  key: "root",
  storage,
};
// ✅ Wrap reducers with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedMedicationReducer = persistReducer(persistConfig, medicationReducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    medications: persistedMedicationReducer,
  },

});
export const persistor = persistStore(store);
export default store;
