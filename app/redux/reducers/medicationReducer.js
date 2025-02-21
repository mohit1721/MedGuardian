'use client'

import { createSlice } from '@reduxjs/toolkit';

const medicationSlice = createSlice({
  name: 'medications',
  initialState: {
    medications: [],
    currentMedication: null, // Initialize as null, since we are dealing with a single medication
  },
  reducers: {
    setMedications: (state, action) => {
      state.medications = action.payload || []; // ✅ Ensure payload is an array
      // state.currentMedication = action.payload;
    },
    setCurrentMedication: (state, action) => {
      // state.medications = action.payload;
      state.currentMedication = action.payload;
    },
    addMedication: (state, action) => {
      state.medications = [...state.medications, action.payload]; // ✅ Avoid mutations
    },
    updateMedication: (state, action) => {
      const index = state.medications.findIndex(
        (med) => med._id === action.payload._id
      );
      if (index !== -1) {
        state.medications[index] = action.payload;
      }
    },
    deleteMedication: (state, action) => {
      state.medications = state.medications.filter(
        (med) => med._id !== action.payload
      );
    },
    
  },
});

export const { setMedications,setCurrentMedication, addMedication, updateMedication, deleteMedication } = medicationSlice.actions;
export default medicationSlice.reducer;
