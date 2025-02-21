"use client";

import React from "react";
import { motion } from "framer-motion"; // For smooth animation

const ConfirmationModal = ({ setShowModal, medicationId, handleDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl text-black/50 font-semibold text-center mb-4">Are you sure?</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">
          You are about to delete this medication.
           This action cannot be undone.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setShowModal(false)} // Close the modal
            className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete(medicationId); // Call the delete function
              setShowModal(false); // Close the modal after deletion
            }}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Confirm Deletion
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
