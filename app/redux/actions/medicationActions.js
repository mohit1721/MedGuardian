"use client";

import axios from "axios";
import { 
  setMedications, 
  setCurrentMedication, 
  addMedication, 
  updateMedication, 
  deleteMedication 
} from "../reducers/medicationReducer";
import { getAuthorizationHeader } from "../../../utils/authorization"; 
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api/medications"; 

// ✅ Fetch all medications for the user
export const fetchMedications = () => async (dispatch) => {
  try {
    const authHeader = getAuthorizationHeader();
    if (!authHeader) return;

    const response = await axios.get(API_BASE_URL, { headers: authHeader });
    dispatch(setMedications(Array.isArray(response?.data) ? response?.data : []));
  } catch (error) {
    console.log("Error fetching medications:", error.response?.data || error.message);
  }
};

// ✅ Fetch medication details by ID
export const fetchMedicationById = (medicationId) => async (dispatch) => {
  try {
    console.log("🔍 Fetching medication with ID:", medicationId);
    const authHeader = getAuthorizationHeader();
    if (!authHeader) return Promise.reject("Unauthorized: No token found");

    const response = await axios.get(`${API_BASE_URL}/${medicationId}`, { headers: authHeader });
    console.log("✅ Fetched medication data:", response.data);
    dispatch(setCurrentMedication(response.data));
    return response.data;
  } catch (error) {
    console.log("❌ Error fetching medication:", error);
    return Promise.reject(error);
  }
};

// ✅ Add a new medication
export const createMedicationAction = (medicationData) => async (dispatch) => { 
  try {
    const authHeader = getAuthorizationHeader();
    if (!authHeader) return;

    const response = await axios.post(API_BASE_URL, medicationData, { headers: authHeader });
    if (!response.data || !response.data.newMedication) {
      throw new Error("Invalid response from server: Medication data is missing.");
    }

    dispatch(addMedication(response.data.newMedication));
    toast.success("Medication added successfully!");
  } catch (error) {
    toast.error("Error adding medication");
    console.log("Error adding medication:", error);
  }
};

// ✅ Update an existing medication
export const modifyMedicationAction = (medicationData) => async (dispatch, getState) => {
  try {
    const authHeader = getAuthorizationHeader();
    if (!authHeader) return;

    const response = await axios.put(`${API_BASE_URL}/${medicationData._id}`, medicationData, { headers: authHeader });
    dispatch(updateMedication(response.data.medication));

    const { medications } = getState().medications;
    const updatedMedications = medications.map((med) =>
      med._id === response.data.medication._id ? response.data.medication : med
    );

    dispatch(setMedications(updatedMedications));
  } catch (error) {
    console.log("Error updating medication:", error);
  }
};

// ✅ Delete a medication
export const deleteMedicationAction = (medicationId) => async (dispatch) => {
  try {
    const authHeader = getAuthorizationHeader();
    if (!authHeader) return;

    await axios.delete(`${API_BASE_URL}/${medicationId}`, { headers: authHeader });
    dispatch(deleteMedication(medicationId));
  } catch (error) {
    console.log("Error deleting medication:", error);
  }
};

// ✅ Mark a specific dose as taken
export const markAsTakenAction = (medicationId, doseTime) => async (dispatch) => {
  try {
    const authHeader = getAuthorizationHeader();
    if (!authHeader) return;

    console.log(`🔄 Marking dose ${doseTime} as taken for medication ID:`, medicationId);

    const response = await axios.put(
      `${API_BASE_URL}/mark-as-taken/${medicationId}`,
      { doseTime },
      { headers: authHeader }
    );

    console.log("✅ Marked as taken response:", response.data);
    dispatch(updateMedication(response.data.medication));
    toast.success(response.data.message);

    return response;
  } catch (error) {
    console.log("❌ Error marking medication as taken:", error);
    toast.error(error.response?.data?.error || "Error marking medication as taken. Please try again.");
  }
};


// **
// "use client"; 
// import axios from "axios";
// import { 
//   setMedications, 
//   setCurrentMedication, 
//   addMedication, 
//   updateMedication, 
//   deleteMedication 
// } from "../reducers/medicationReducer";
// import { getAuthorizationHeader } from "../../../utils/authorization"; // Import the utility
// import {toast} from "react-hot-toast"
// import { useSelector } from "react-redux";
// const API_BASE_URL = "http://localhost:5000/api/medications"; // Base API URL
// // const medications = useSelector((state) => state.medications.medications || []);

// // ✅ Fetch all medications for the user
// export const fetchMedications = () => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader();
//     if (!authHeader) return;

//     const response = await axios.get(API_BASE_URL, { headers: authHeader });
//     dispatch(setMedications(Array.isArray(response?.data) ? response?.data : []));
//   } catch (error) {
//     console.log("Error fetching medications:", error.response?.data || error.message);
//   }
// };

// // ✅ Fetch medication details by ID
// export const fetchMedicationById = (medicationId) => async (dispatch) => {
//   try {
//     console.log("🔍 Fetching medication with ID:", medicationId);
//     const authHeader = getAuthorizationHeader();
//     if (!authHeader) return Promise.reject("Unauthorized: No token found");

//     const response = await axios.get(`${API_BASE_URL}/${medicationId}`, { headers: authHeader });

//     console.log("✅ Fetched medication data:", response.data);
//     dispatch(setCurrentMedication(response.data)); // Store the fetched medication in Redux
//     return response.data;
//   } catch (error) {
//     console.log("❌ Error fetching medication:", error);
//     return Promise.reject(error);
//   }
// };

// // ✅ Add a new medication
// export const createMedicationAction = (medicationData) => async (dispatch) => { 
//   try {
//     const authHeader = getAuthorizationHeader();
//     if (!authHeader) return;

//     const response = await axios.post(API_BASE_URL, medicationData, { headers: authHeader });

//     if (!response.data || !response.data.newMedication) {
//       throw new Error("Invalid response from server: Medication data is missing.");
//     }

//     dispatch(addMedication(response.data.newMedication));  // ✅ Naya medication Redux store me push hoga
//     toast.success("Medication added successfully!");
//   } catch (error) {
//     toast.error("Error adding medication");
//     console.log("Error adding medication:", error)
//   }
// };

// // ✅ Update an existing medication
// export const modifyMedicationAction = (medicationData) => async (dispatch, getState) => {
//   try {
//     const authHeader = getAuthorizationHeader();
//     if (!authHeader) return;

//     const response = await axios.put(`${API_BASE_URL}/${medicationData._id}`, medicationData, { headers: authHeader });

//     dispatch(updateMedication(response.data.medication)); // ✅ Update medication in Redux store

//     // ✅ Fetch the updated medications list from Redux store
//     const { medications } = getState().medications;
//     const updatedMedications = medications.map((med) =>
//       med._id === response.data.medication._id ? response.data.medication : med
//     );

//     dispatch(setMedications(updatedMedications)); // ✅ Ensure UI updates

//   } catch (error) {
//     console.log("Error updating medication:", error);
//   }
// };


// // ✅ Delete a medication
// export const deleteMedicationAction = (medicationId) => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader();
//     if (!authHeader) return;

//     await axios.delete(`${API_BASE_URL}/${medicationId}`, { headers: authHeader });
//     dispatch(deleteMedication(medicationId));
//     // toast.success(response.data.message)
//   } catch (error) {
//     // toast.error(response.data.message)
//     console.log("Error deleting medication:", error);
//   }
// };
// // ✅ Mark a specific dose as taken

// export const markAsTakenAction = (medicationId, doseTime) => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader();
//     if (!authHeader) return;

//     console.log(`🔄 Marking dose ${doseTime} as taken for medication ID:`, medicationId);

//     const response = await axios.put(
//       `${API_BASE_URL}/mark-as-taken/${medicationId}`,
//       { doseTime }, // ✅ Ensure time is sent properly
//       { headers: authHeader }
//     );

//     console.log("✅ Marked as taken response:", response.data);

//     // Redux store update
//     dispatch(updateMedication(response.data.medication));

//     // Show success message
//     toast.success(response.data.message);

//     return response;
//   } catch (error) {
//     console.log("❌ Error marking medication as taken:", error);
//     toast.error(error.response?.data?.error || "Error marking medication as taken. Please try again.");
//   }
// };