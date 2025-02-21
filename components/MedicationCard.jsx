"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedicationAction, markAsTakenAction } from "../app/redux/actions/medicationActions";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import moment from "moment";
import MedicationForm from "./MedicationForm";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";

const MedicationCard = ({ medication }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const medications = useSelector((state) => state.medications.medications || []);
  const updatedMedication = medications.find((med) => med._id === medication._id) || medication;
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [loadingDose, setLoadingDose] = useState(null);
  const router = useRouter();
  const today = moment().format("DD-MM-YYYY");

  const handleMarkAsTaken = async (doseTime) => {
    try {
      setLoadingDose(doseTime);
      await dispatch(markAsTakenAction(medication._id, doseTime));
      // toast.success(`Dose at ${doseTime} marked as taken!`);
      setLoadingDose(null);
    } catch (error) {
      setLoadingDose(null);
      toast.error("Failed to mark medication as taken.");
    }
  };
  const handleDelete = async () => {
    setLoadingDose(true);
    try {
      await dispatch(deleteMedicationAction(medication._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting medication:", error);
    } finally {
      setLoadingDose(false);
    }
  };
  const hasDoseBeenTaken = (doseTime) => {
    return updatedMedication?.takenHistory?.some(
      (entry) => moment(entry.date).format("DD-MM-YYYY") === today && entry.times.includes(doseTime)
    );
  };

  return (
    <motion.div className="p-6 shadow-lg rounded-lg relative bg-white/30 p-6 shadow-xl rounded-lg capitalize backdrop-blur-lg border border-white/20 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-semibold">{medication?.name}</h3>
      <p>{medication?.dosage}</p>

      <div className="mt-4 flex flex-col gap-5">
        {medication?.time.map((doseTime, index) => (
          <div key={index} className="flex justify-between items-center">
            <p>{doseTime}</p>
            <p className="text-center">{hasDoseBeenTaken(doseTime) ? "✅ Taken Today" : "❌ Not Taken"}</p>
            <button
              onClick={() => handleMarkAsTaken(doseTime)}
              className={`px-4 w-fit py-2 rounded ${
                hasDoseBeenTaken(doseTime)
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 w-fit text-white hover:bg-blue-700"
              }`}
              disabled={hasDoseBeenTaken(doseTime) || loadingDose === doseTime}
            >
            <span className="w-fit text-sm"> {loadingDose === doseTime ? "Loading..." : hasDoseBeenTaken(doseTime) ? "Marked" : "Mark Taken"}</span>
              
            </button>
          </div>
        ))}
      </div>


      <div className="flex justify-between mt-4 gap-2 mx-auto">
        <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all">
          Delete
        </button>

        <button
          onClick={() => router.push(`/medication-progress/${medication?._id}`)}
          className="px-4 text-sm w-fit py-2 bg-[#A6CDC6] text-[#16404D] rounded hover:text-[#A6CDC6] hover:bg-[#16404D] transition-all"
        >
          View Details
        </button>
      </div>

      {selectedMedication && (
        <MedicationForm setShowModal={() => setSelectedMedication(null)} medication={selectedMedication} />
      )}

      {showDeleteModal && (
        <ConfirmationModal setShowModal={setShowDeleteModal} medicationId={medication?._id} handleDelete={handleDelete} />
      )}

      
    </motion.div>
  );
};

export default MedicationCard;


// ---
// "use client";

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { markAsTakenAction, deleteMedicationAction } from "../app/redux/actions/medicationActions";
// import { motion } from "framer-motion";
// import MedicationForm from "./MedicationForm";
// import ConfirmationModal from "./ConfirmationModal";
// import { useRouter } from "next/navigation";
// import { updateMedication } from "@/app/redux/reducers/medicationReducer";
// import { toast } from "react-hot-toast";

// const MedicationCard = ({ medication }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // Ensure state.medications is an array before using find()
//   const medications = useSelector((state) => Array.isArray(state.medications) ? state.medications : []);
//   const updatedMedication = medications.find((med) => med._id === medication._id) || medication;
//   useEffect(() => {
//     console.log("Updated Medication:", updatedMedication);
//   }, [updatedMedication]);
//   useEffect(() => {
//     console.log("Re-render triggered");
//   }, [updatedMedication]);
  
//   const [loadingDose, setLoadingDose] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMarkDisabled, setIsMarkDisabled] = useState(false);
//   const [selectedMedication, setSelectedMedication] = useState(null);

  // const handleMarkAsTaken = async (doseTime) => {
  //   try {
  //     setLoadingDose(doseTime);
  //     const response = await dispatch(markAsTakenAction(medication._id, doseTime));

  //     if (response?.data?.medication) {
  //       dispatch(updateMedication(response.data.medication));
  //     }
  //     setLoadingDose(null);
  //   } catch (error) {
  //     console.error("❌ Error marking medication as taken:", error);
  //     setLoadingDose(null);
  //     toast.error("Failed to mark medication as taken.");
  //   }
  // };

  // const hasDoseBeenTaken = (doseTime) => {
  //   return updatedMedication?.takenDoses?.includes(doseTime) || medication?.takenDoses?.includes(doseTime);
  // };

  // const handleDelete = async () => {
  //   setIsLoading(true);
  //   try {
  //     await dispatch(deleteMedicationAction(medication._id));
  //     setShowDeleteModal(false);
  //   } catch (error) {
  //     console.error("Error deleting medication:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

//   useEffect(() => {
//     const takenToday = medication?.takenHistory?.some(entry => {
//       const takenDate = new Date(entry.date);
//       return takenDate.toDateString() === new Date().toDateString();
//     });
//     setIsMarkDisabled(takenToday);
//   }, [medication]);

//   return (
//     <motion.div
//       className="relative bg-white/30 p-6 shadow-xl rounded-lg capitalize backdrop-blur-lg border border-white/20 hover:shadow-2xl transition-all duration-300"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.02 }}
//     >
//       <h3 className="text-xl font-semibold text-black">{medication?.name}</h3>
//       <p>{medication?.dosage}</p>
//       <p>Duration: {medication?.duration} days</p>

      // <div className="mt-4 flex flex-col gap-5">
      //   {medication?.time.map((doseTime, index) => (
      //     <div key={index} className="flex gap-5 justify-between items-center">
      //       <p>{doseTime}</p>
      //       <p>{hasDoseBeenTaken(doseTime) ? "✅ Taken" : "❌ Not Taken"}</p>
      //       {!hasDoseBeenTaken(doseTime) && (
      //         <motion.button
      //           onClick={() => handleMarkAsTaken(doseTime)}
      //           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
      //           whileTap={{ scale: 0.95 }}
      //           disabled={loadingDose === doseTime}
      //         >
      //           {loadingDose === doseTime ? "Loading..." : "Mark as Taken"}
      //         </motion.button>
      //       )}
      //     </div>
      //   ))}
      // </div>

      // <div className="flex justify-between mt-4 gap-2 mx-auto">
      //   <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all">
      //     Delete
      //   </button>

      //   <button
      //     onClick={() => router.push(`/medication-progress/${medication?._id}`)}
      //     className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all"
      //   >
      //     View Details
      //   </button>
      // </div>

      // {selectedMedication && (
      //   <MedicationForm setShowModal={() => setSelectedMedication(null)} medication={selectedMedication} />
      // )}

      // {showDeleteModal && (
      //   <ConfirmationModal setShowModal={setShowDeleteModal} medicationId={medication?._id} handleDelete={handleDelete} />
      // )}
//     </motion.div>
//   );
// };

// export default MedicationCard;
