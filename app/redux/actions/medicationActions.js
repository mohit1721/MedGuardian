// import axios from "axios";
// import { setMedications,setCurrentMedication, addMedication, updateMedication, deleteMedication } from "../reducers/medicationReducer";
// import { getAuthorizationHeader } from "../../../utils/authorization"; // Import the utility
// // Action to fetch all medications of the user
// export const fetchMedications = () => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader(); // Get the authorization header

//     // If no authorization header, return early
//     if (!authHeader) return;

//     // Make API call with Authorization header
//     const response = await axios.get("http://localhost:5000/api/medications", {
//       headers: authHeader, // Attach token
//     });

//     dispatch(setMedications(response.data)); // Dispatch action to update Redux state
//   } catch (error) {
//     console.error("Error fetching medications:", error.response?.data || error.message);
//   }
// };

// // Action to add a new medication
// export const createMedication = (medicationData) => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader(); // Get the authorization header

//     // If no authorization header, return early
//     if (!authHeader) return;

//     const response = await axios.post(
//       "http://localhost:5000/api/medications",
//       medicationData,
//       { headers: authHeader } // Attach token
//     );
//     dispatch(addMedication(response.data)); // Dispatch action to add medication
//   } catch (error) {
//     console.error("Error adding medication:", error);
//   }
// };

// // Action to update an existing medication
// export const modifyMedication = (medicationData) => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader(); // Get the authorization header

//     // If no authorization header, return early
//     if (!authHeader) return;

//     const response = await axios.put(
//       `http://localhost:5000/api/medications/${medicationData._id}`,
//       medicationData,
//       { headers: authHeader } // Attach token
//     );
//     dispatch(updateMedication(response.data)); // Dispatch action to update medication
//   } catch (error) {
//     console.error("Error updating medication:", error);
//   }
// };

// // Action to delete a medication
// export const deleteMedicationAction = (medicationId) => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader(); // Get the authorization header

//     // If no authorization header, return early
//     if (!authHeader) return;

//     await axios.delete(`http://localhost:5000/api/medications/${medicationId}`, { headers: authHeader });
//     dispatch(deleteMedication(medicationId)); // Dispatch action to delete medication
//   } catch (error) {
//     console.error("Error deleting medication:", error);
//   }
// };
// // Action to mark medication as taken
// export const markAsTakenAction = (medicationId) => async (dispatch) => {
//   try {
//     const authHeader = getAuthorizationHeader(); // Get the authorization header

//     // If no authorization header, return early
//     if (!authHeader) return;

//     // API call to mark the medication as taken
//     const response = await axios.put(
//       `http://localhost:5000/api/medications/mark-as-taken/${medicationId}`,
//       {},
//       { headers: authHeader } // Attach token
//     );

//     // Dispatch action to update medication state
//     dispatch(updateMedication(response.data.medication)); // Update medication state in Redux
//  // Return the response so that the component can use it
//  return response;
 
//   } catch (error) {
//     console.error("Error marking medication as taken:", error);
//   }
// };
// // Action to fetch medication details by ID
// // 

// export const fetchMedicationById = (medicationId) => async (dispatch) => {
//   try {
//     console.log("Fetching medication with ID:", medicationId); // Debugging log

//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("No authentication token found.");
//       return Promise.reject("Unauthorized: No token found");
//     }

//     const response = await axios.get(`http://localhost:5000/api/medications/${medicationId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     console.log("Fetched medication data:", response.data); // Debugging log
//     // Dispatch action to store the fetched medication in Redux state
//     dispatch(setCurrentMedication(response.data)); // Updates the currentMedication state in Redux
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching medication:", error);
//     return Promise.reject(error);
//   }
// };


// **
"use client"; 
import axios from "axios";
import { 
  setMedications, 
  setCurrentMedication, 
  addMedication, 
  updateMedication, 
  deleteMedication 
} from "../reducers/medicationReducer";
import { getAuthorizationHeader } from "../../../utils/authorization"; // Import the utility
import {toast} from "react-hot-toast"
import { useSelector } from "react-redux";
const API_BASE_URL = "http://localhost:5000/api/medications"; // Base API URL
// const medications = useSelector((state) => state.medications.medications || []);

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
    dispatch(setCurrentMedication(response.data)); // Store the fetched medication in Redux
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

    dispatch(addMedication(response.data.newMedication));  // ✅ Naya medication Redux store me push hoga
    toast.success("Medication added successfully!");
  } catch (error) {
    toast.error("Error adding medication");
    console.log("Error adding medication:", error)
  }
};

// ✅ Update an existing medication
export const modifyMedicationAction = (medicationData) => async (dispatch, getState) => {
  try {
    const authHeader = getAuthorizationHeader();
    if (!authHeader) return;

    const response = await axios.put(`${API_BASE_URL}/${medicationData._id}`, medicationData, { headers: authHeader });

    dispatch(updateMedication(response.data.medication)); // ✅ Update medication in Redux store

    // ✅ Fetch the updated medications list from Redux store
    const { medications } = getState().medications;
    const updatedMedications = medications.map((med) =>
      med._id === response.data.medication._id ? response.data.medication : med
    );

    dispatch(setMedications(updatedMedications)); // ✅ Ensure UI updates

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
    // toast.success(response.data.message)
  } catch (error) {
    // toast.error(response.data.message)
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
      { doseTime }, // ✅ Ensure time is sent properly
      { headers: authHeader }
    );

    console.log("✅ Marked as taken response:", response.data);

    // Redux store update
    dispatch(updateMedication(response.data.medication));

    // Show success message
    toast.success(response.data.message);

    return response;
  } catch (error) {
    console.log("❌ Error marking medication as taken:", error);
    toast.error(error.response?.data?.error || "Error marking medication as taken. Please try again.");
  }
};