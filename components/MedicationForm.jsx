
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMedicationAction, modifyMedicationAction } from "../app/redux/actions/medicationActions";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { setMedications } from "@/app/redux/reducers/medicationReducer";
import {moment} from 'moment-timezone';
const MedicationForm = ({ setShowModal, medication = null }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: ["12:00 AM"],
    startDate: "",
    duration: "",
    reminderEnabled: true,
  });
  const [reminderEnabledSt, setReminderEnabled] = useState(true);
  useEffect(() => {
    if (medication) {
      setFormData({
        ...medication,
        time: Array.isArray(medication.time) ? medication.time : ["12:00 AM"],
      });
    }
  }, [medication]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleTimeChange = (index, time) => {
  //   const newTimeArray = [...formData.time];
  //   newTimeArray[index] = time;
  //   setFormData({ ...formData, time: newTimeArray });
  // };
  const handleTimeChange = (index, time) => {
    if (!time) return;
    
    // Convert selected time to IST
    const istTime = moment(time, "hh:mm A").tz("Asia/Kolkata").format("hh:mm A");
    
    const newTimeArray = [...formData.time];
    newTimeArray[index] = istTime;
    
    setFormData({ ...formData, time: newTimeArray });
  };
  
  const addTimeSlot = () => {
    setFormData({ ...formData, time: [...formData.time, "12:00 AM"] });
  };

  const removeTimeSlot = (index) => {
    const newTimeArray = formData.time.filter((_, i) => i !== index);
    setFormData({ ...formData, time: newTimeArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let newMedication;
    if (medication) {
      newMedication = await dispatch(modifyMedicationAction({ ...formData, _id: medication._id }));
    } else {
      newMedication = await dispatch(createMedicationAction(formData));
    }

    if (newMedication) {
      dispatch(setMedications((prev) => [...prev, newMedication]));
    }

    setIsLoading(false);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black/50">
      {/* Overlay to close modal */}
      <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShowModal(false)}></div>

      {/* Modal Content */}
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md z-50 max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{medication ? "Edit Medication" : "Add Medication"}</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Medication Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Medication Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          {/* Dosage */}
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="Dosage"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          {/* Time Slots with Remove Option */}
          <div className="space-y-3">
            {formData.time.map((time, index) => (
              <div key={index} className="flex items-center gap-3">
                <TimePicker
                  onChange={(newTime) => handleTimeChange(index, newTime)}
                  value={time}
                  format="hh:mm a"
                  className="w-full border-none rounded-lg"
                  disableClock
                  clockIcon={null}
                  clearIcon={null}
                />
                {formData.time.length > 1 && (
                  <button type="button" onClick={() => removeTimeSlot(index)} className="text-gray-500 hover:text-red-700">
                    <span className="h-6 w-6">✖</span>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addTimeSlot} className="px-3 py-2 bg-green-500 text-white rounded-lg">
              + Add Time
            </button>
          </div>

          {/* Start Date */}
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          {/* Duration */}
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min={0}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
 
 {/* Reminder Toggle */}
 <div className="flex items-center space-x-4">
            <span className="text-gray-600">Reminder:</span>
            <div
              className={`relative w-12 h-6 p-[0.99] mt-1 rounded-full cursor-pointer transition-all duration-300 ${formData.reminderEnabled ? "bg-green-500" : "bg-gray-300"}`}
              onClick={() => setFormData({ ...formData, reminderEnabled: !formData.reminderEnabled })}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${formData.reminderEnabled ? "translate-x-6" : "translate-x-0"}`}
              ></div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex justify-between">
            <button type="button" onClick={() => setShowModal(false)} className="px-5 py-3 bg-gray-400 text-white rounded-lg">
              Cancel
            </button>

            <button type="submit" className="px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center" disabled={isLoading}>
              {isLoading ? <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (medication ? "Update" : "Add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationForm;
