

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
  const [loading, setLoading] = useState(true); 
  // Fetch medications when component mounts & user exists
  useEffect(() => {
    if (user && user._id) {
      setLoading(true); // Start loader
      dispatch(fetchMedications(user._id)).finally(() => setLoading(false)); // Stop loader
    
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
          {loading ? ( // ✅ Show loader while data is loading
            <p className="text-xl text-center text-gray-400 animate-pulse">
              Loading medications...
            </p>
          ) : Array.isArray(medications) && medications?.length > 0 ? (
            medications?.map((med, index) => <MedicationCard key={index} medication={med} />)
          ) : (
            <p className="text-xl text-center text-gray-600">No medications found.</p>
          )}
        </div>
      </div>

      {/* Medication Form Modal */}
      {showModal && <MedicationForm setShowModal={setShowModal} />}
    </div>
  );
};

export default Dashboard;
// --
