// "use client";

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { createMedicationAction, modifyMedicationAction } from "../app/redux/actions/medicationActions";
// import { format, parse } from "date-fns"; // Import date-fns for date manipulation
// import TimePicker from "react-time-picker"; // Import react-time-picker
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import { setMedications } from "@/app/redux/reducers/medicationReducer";

// const MedicationForm = ({ setShowModal, medication = null }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: "",
//     dosage: "",
//     time: ["12:00 AM", "12:00 AM", "12:00 AM"], // Default value in case times are missing
//     startDate: "",
//     duration: "",
//   });

//   // Prefill form if editing
//   useEffect(() => {
//     if (medication) {
//       const formattedTimes = Array.isArray(medication.time) ? medication.time : ["12:00 AM", "12:00 AM", "12:00 AM"];
//       setFormData({
//         ...medication,
//         time: formattedTimes,
//       });
//     }
//   }, [medication]);
  
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleTimeChange = (index, time) => {
//     const newTimeArray = [...formData.time];
//     newTimeArray[index] = time; // Update the time at the specific index
//     setFormData({ ...formData, time: newTimeArray });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Ensure the time is properly formatted before submitting
//     const formattedTimes = formData.time.map((time) => formatTime(time));

//     if (medication) {
//       dispatch(modifyMedicationAction({ ...formData, time: formattedTimes, _id: medication._id }));
//     } else {
//       dispatch(createMedicationAction({ ...formData, time: formattedTimes }));
//     }
//     if (medication) {
//       dispatch(setMedications(prevMedications => [...prevMedications, medication])); 
//     } else {
//       console.error("Medication is null, skipping update.");
//     }
    
//     setShowModal(false); // Close the modal
//   };

//   // Function to format time into hh:mm a format (AM/PM)
//   const formatTime = (time) => {
//     try {
//       const date = new Date(`1970-01-01T${time}:00`);
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//     } catch (error) {
//       console.error("Invalid time format:", error);
//       return "12:00 AM"; // Return default if invalid
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop to prevent interaction with the background */}
//       <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShowModal(false)}></div>
      
//       <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-50">
//         <h2 className="text-2xl font-semibold mb-4 text-center">{medication ? "Edit Medication" : "Add Medication"}</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Medication Name */}
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Medication Name"
//             required
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           />
          
//           {/* Dosage */}
//           <input
//             type="text"
//             name="dosage"
//             value={formData.dosage}
//             onChange={handleChange}
//             placeholder="Dosage"
//             required
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           />

//           {/* Time Pickers */}
//           <div className="space-y-4">
//             {formData.time.map((time, index) => (
//               <div key={index} className="relative">
//                 <TimePicker
//                   onChange={(newTime) => handleTimeChange(index, newTime)}
//                   value={time}
//                   format="hh:mm a" // 12-hour format with AM/PM
//                   className="w-full top-2 p-3 border border-gray-300 rounded-lg focus:outline-none transition"
//                   required
//                   disableClock={false} // Enabling the clock to be shown
//                   clockIcon={null} // Hide the default clock icon
//                   clearIcon={null} // Hide the clear icon
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Start Date */}
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           />

//           {/* Duration */}
//           <input
//             type="number"
//             name="duration"
//             value={formData.duration}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-lg"
//           />

//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={() => setShowModal(false)} // Close the modal
//               className="px-6 py-3 bg-gray-400 text-white rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg"
//             >
//               {medication ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MedicationForm;
  

// *----
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMedicationAction, modifyMedicationAction } from "../app/redux/actions/medicationActions";
import { format } from "date-fns";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { setMedications } from "@/app/redux/reducers/medicationReducer";

const MedicationForm = ({ setShowModal, medication = null }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // ✅ Add loader state
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: ["12:00 AM", "12:00 AM", "12:00 AM"],
    startDate: "",
    duration: "",
  });

  useEffect(() => {
    if (medication) {
      setFormData({
        ...medication,
        time: Array.isArray(medication.time) ? medication.time : ["12:00 AM", "12:00 AM", "12:00 AM"],
      });
    }
  }, [medication]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (index, time) => {
    const newTimeArray = [...formData.time];
    newTimeArray[index] = time;
    setFormData({ ...formData, time: newTimeArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 🟢 Start loader

    const formattedTimes = formData.time.map((time) => formatTime(time));

    let newMedication;
    if (medication) {
      newMedication = await dispatch(modifyMedicationAction({ ...formData, time: formattedTimes, _id: medication._id }));
    } else {
      newMedication = await dispatch(createMedicationAction({ ...formData, time: formattedTimes }));
    }

    if (newMedication) {
      dispatch(setMedications((prev) => [...prev, newMedication]));
    } else {
      console.log("Medication creation failed.");
    }

    setIsLoading(false); // 🔴 Stop loader
    setShowModal(false); // Close modal
  };

  const formatTime = (time) => {
    try {
      const date = new Date(`1970-01-01T${time}:00`);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch (error) {
      console.log("Invalid time format:", error);
      return "12:00 AM";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShowModal(false)}></div>

      <div className="modal-content bg-[#EFE9D5] text-black/50 bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-50">
        <h2 className="text-2xl font-semibold mb-4 text-center">{medication ? "Edit Medication" : "Add Medication"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Medication Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="Dosage"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <div className="space-y-4">
            {formData.time.map((time, index) => (
              <div key={index} className="relative">
                <TimePicker
                  onChange={(newTime) => handleTimeChange(index, newTime)}
                  value={time}
                  format="hh:mm a"
                  className="w-full top-2 p-3 border border-gray-300 rounded-lg focus:outline-none transition"
                  required
                  disableClock={false}
                  clockIcon={null}
                  clearIcon={null}
                />
              </div>
            ))}
          </div>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min={0}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center"
              disabled={isLoading} // ✅ Disable button while loading
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                medication ? "Update" : "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationForm;
