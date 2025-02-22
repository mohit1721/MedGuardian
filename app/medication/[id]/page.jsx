
// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMedicationById } from "@/app/redux/actions/medicationActions";
// import { Bar } from "react-chartjs-2";
// import { setMedications } from "@/app/redux/reducers/medicationReducer";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the necessary components
// ChartJS.register(
//   CategoryScale, // Register the CategoryScale for the x-axis
//   LinearScale,   // Register the LinearScale for the y-axis
//   BarElement,    // Register the BarElement for bar charts
//   Title,         // Register Title for chart titles
//   Tooltip,       // Register Tooltip for tooltips
//   Legend         // Register Legend for chart legends
// );

// const MedicationDetailsPage = () => {
//   const { id } = useParams(); // ✅ Get medication ID from URL
//   const router = useRouter();
//   const dispatch = useDispatch();
  
//   const medication = useSelector((state) => state.medications.currentMedication); // ✅ Get medication from Redux
//   console.log("medication is page selected from store", medication);
  
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     if (!id) return; // If no ID, return early

//     setLoading(true);

//     // Fetch medication data from backend
//     dispatch(fetchMedicationById(id))
//       .then((response) => {
//         // No need for setMedication here; Redux will update state
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching medication:", error);
//         router.push("/dashboard"); // Redirect to dashboard on error
//         setLoading(false);
//       });
//   }, [id, dispatch]);


//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading medication details...</div>;
//   }

//   if (!medication) {
//     return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Medication not found.</div>;
//   }

//   const { name, dosage,time, duration, reminderEnabled, takenDays, skippedDays } = medication;
// console.log(`Medication data`,name, dosage,time, duration, reminderEnabled, takenDays, skippedDays )
 
// const chartData = {
//     labels: ["Taken", "Skipped"], // Labels for the x-axis
//     datasets: [
//       {
//         data: [takenDays, skippedDays], // The data points
//         backgroundColor: ["#4CAF50", "#FF5733"], // Colors for each bar
//       },
//     ],
//   };


// return (
//     <div className="min-h-screen p-6 text-black">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-semibold mb-6 text-gray-900">Medication Details</h2>
//         <p className="text-lg"><strong>Name:</strong> {name}</p>
//         <p className="text-lg"><strong>Dosage:</strong> {dosage}</p>
//         <p className="text-lg"><strong>Duration:</strong> {duration} days</p>
//         <p className="text-lg"><strong>Taken Days:</strong> {takenDays} / {duration}</p>

//         <div className="my-6">
//         <Bar
//         // style={{ backgroundColor : '#FK5713'}}
//         className="bg-blue-200 rounded-lg p-10 "
//          data={chartData} />
//         </div>

//         <button onClick={() => router.push("/dashboard")} className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all">
//           Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MedicationDetailsPage;
// **
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicationById, markAsTakenAction } from "@/app/redux/actions/medicationActions";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MedicationDetailsPage = () => {
  const { id } = useParams(); // ✅ Always call Hooks at the top level
  const router = useRouter();
  const dispatch = useDispatch();

  const medication = useSelector((state) => state.medications.currentMedication);
  const [loading, setLoading] = useState(true);
  const [isMarkDisabled, setIsMarkDisabled] = useState(false);
  
  // ✅ Fetch medication details once the component mounts
  useEffect(() => {
    if (!id) return; // ✅ No conditional Hook calls
    setLoading(true);

    dispatch(fetchMedicationById(id))
      .finally(() => setLoading(false));

  }, [id, dispatch]);

  // ✅ Disable "Mark as Taken" button if the dose is already taken today
  useEffect(() => {
    if (medication && medication.takenHistory) {
      const takenToday = medication.takenHistory.some(entry => {
        const takenDate = new Date(entry);
        return takenDate.toDateString() === new Date().toDateString();
      });

      setIsMarkDisabled(takenToday); // ✅ Always inside `useEffect`, not directly in JSX
    }
  }, [medication]);

  // ✅ Function to mark a specific dose as taken
  const handleMarkAsTaken = async () => {
    if (!medication || !medication._id) return;

    const doseTime = medication.time[0]; // Example: First scheduled dose time
    try {
      await dispatch(markAsTakenAction(medication._id, doseTime));
    } catch (error) {
      console.log("Error marking medication as taken:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading medication details...</div>;
  }

  if (!medication) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Medication not found.</div>;
  }

  const { name, dosage, time, duration, reminderEnabled, takenDays, skippedDays, startDate } = medication;

  const chartData = {
    labels: ["Taken", "Skipped"],
    datasets: [
      {
        data: [takenDays || 0, skippedDays || 0],
        backgroundColor: ["#4CAF50", "#FF5733"],
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 text-black">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Medication Details</h2>

        <p className="text-lg"><strong>Name:</strong> {name}</p>
        <p className="text-lg"><strong>Dosage:</strong> {dosage}</p>
        <p className="text-lg"><strong>Duration:</strong> {duration} days</p>
        <p className="text-lg"><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
        <p className="text-lg"><strong>Reminder Enabled:</strong> {reminderEnabled ? "Yes" : "No"}</p>
        <p className="text-lg"><strong>Times:</strong> {time.join(", ")}</p>

        <p className="text-lg"><strong>Taken Days:</strong> {takenDays} / {duration}</p>
        <p className="text-lg"><strong>Skipped Days:</strong> {skippedDays} / {duration}</p>

        {/* Bar Chart for Taken vs Skipped */}
        <div className="my-6">
          <Bar className="bg-blue-200 rounded-lg p-10" data={chartData} />
        </div>

        {/* ✅ Mark as Taken Button */}
        <button
          onClick={handleMarkAsTaken}
          className={`px-4 py-2 ${isMarkDisabled ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded hover:bg-blue-700 transition-all`}
          disabled={isMarkDisabled} // ✅ Button disabled if taken already today
        >
          {isMarkDisabled ? "Already Taken" : "Mark as Taken"}
        </button>

        <button onClick={() => router.push("/dashboard")} className="ml-4 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MedicationDetailsPage;
