
// "use client"; // This is used in Next.js to specify that the component is client-side

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import MedicationCard from "../../components/MedicationCard"; // Card for displaying individual medications
// import Navbar from "../../components/Navbar"; // Navigation bar component
// import { fetchMedications } from "../../app/redux/actions/medicationActions"; // Action to fetch medications
// import MedicationForm from "../../components/MedicationForm"; // Medication Form Modal
// import { setMedications } from "../redux/reducers/medicationReducer";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const medications = useSelector((state) => state.medications.medications || []);
//   const user = useSelector((state) => state.auth.user); // Get the logged-in user from Redux state
//   const [showModal, setShowModal] = useState(false); // Toggle for Add Medication Form

//   // Fetch medications once the component mounts
//   useEffect(() => {
//     if (user && user._id) {
//       dispatch(fetchMedications(user._id)); // Dispatch action to fetch medications for the logged-in user
//     }
//   }, [dispatch, user]);
//   useEffect(() => {
//     if (medications.length === 0) {  // ✅ Sirf jab pehli baar data load ho
//       dispatch(setMedications([...medications]));
//     }
//   }, []);  // ✅ Empty dependency array se infinite loop nahi hoga
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <div className="container mx-auto p-6 capitalize">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-4xl font-semibold text-gray-900">Welcome, {user?.name}</h1>
//           <button
//             onClick={() => setShowModal(true)}
//             className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
//           >
//             + Add Medication
//           </button>
//         </div>

 
//         {/* Medication Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {medications?.length > 0 ? (
//             medications?.map((med) => (
//               <MedicationCard key={med._id || med.id} medication={med} />
//             ))
//           ) : (
//             <p className="text-lg text-gray-600">No medications found.</p>
//           )}
//         </div>
//       </div>

//       {/* Medication Form Modal */}
//       {showModal && <MedicationForm setShowModal={setShowModal} />}
//     </div>
//   );
// };

// export default Dashboard;


//  **

"use client"; // Next.js ke liye client component

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MedicationCard from "../../components/MedicationCard";
import Navbar from "../../components/Navbar";
import { fetchMedications } from "../../app/redux/actions/medicationActions"; // Fetch action
import MedicationForm from "../../components/MedicationForm"; // Medication form component

const Dashboard = () => {
  const dispatch = useDispatch();
  const medications = useSelector((state) => state.medications?.medications || []);
  const user = useSelector((state) => state.auth.user); // Get logged-in user
  const [showModal, setShowModal] = useState(false); // Modal toggle

  // Fetch medications when component mounts & user exists
  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchMedications(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen text-[#EFE9D5]">
      <Navbar />
      <div className="container mx-auto p-6 capitalize">
        <div className="flex flex-col gap-5 justify-between md:flex-row items-center mb-6">
          <h1 className="text-4xl font-semibold text-[#EFE9D5]">Welcome, <span className="text-[#EFB036]">{user?.name}</span>  </h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 w-fit py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            + Add Medication
          </button>
        </div>

        {/* Medication Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.isArray(medications) && medications?.length > 0 ? (
    medications?.map((med, index) => <MedicationCard key={index} medication={med} />) 
  ) : (
    <p className="text-lg text-gray-600">No medications found.</p>
  )}
</div>

      </div>

      {/* Medication Form Modal */}
      {showModal && <MedicationForm setShowModal={setShowModal} />}
    </div>
  );
};

export default Dashboard;
