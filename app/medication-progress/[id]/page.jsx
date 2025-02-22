"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MedicationProgress = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchMedicationProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medications/progress/${id}`);
        setProgress(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching medication progress:", error);
        setLoading(false);
      }
    };

    fetchMedicationProgress();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading medication details...</div>;
  }

  if (!progress) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Medication not found.</div>;
  }

  const { takenDays, skippedDays, totalDosesTaken, totalDoses, dailyProgress, medication } = progress;

  const chartData = {
    labels: dailyProgress?.map(day => day.date),
    datasets: [
      {
        label: "Doses Taken",
        data: dailyProgress.map(day => day.dosesTaken),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Doses Skipped",
        data: dailyProgress.map(day => day.dosesSkipped),
        backgroundColor: "#FF5733",
      },
    ],
  };

  return (
    <motion.div className="min-h-screen p-6 text-black">
      <button onClick={() => router.push("/dashboard")} className="mb-4 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all">
          Back to Dashboard
        </button>
      <div className="max-w-3xl mx-auto bg-[#D4EBF8] p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Medication Details</h2>

        {/* Display Medication Details */}
        <div className="mb-4">
          <p className="text-lg"><strong>Name:</strong> {medication.name}</p>
          <p className="text-lg"><strong>Dosage:</strong> {medication.dosage}</p>
          <p className="text-lg"><strong>Duration:</strong> {medication.duration} days</p>
          <p className="text-lg"><strong>Start Date:</strong> {new Date(medication.startDate).toLocaleDateString("en-GB")}</p>
          <p className="text-lg"><strong>Reminder Enabled:</strong> {medication.reminderEnabled ? "Yes" : "No"}</p>
          <p className="text-lg"><strong>Times:</strong> {medication.time.join(", ")}</p>
          <p className="text-lg"><strong>Progress:</strong> {takenDays.toFixed(2)}/{(takenDays + skippedDays).toFixed(2)} Days Taken</p>
          <p className="text-lg"><strong>Total Doses Taken:</strong> {totalDosesTaken}/{totalDoses} Doses</p>
        </div>

        {/* Daily Progress Breakdown */}
        <div className="my-6">
          <h3 className="text-xl font-semibold mb-4">Daily Dose Breakdown</h3>
          <ul className="space-y-2">
            {dailyProgress.map((day, index) => (
              <li key={index} className="flex justify-between">
                <p>{day.date}: </p>
                <div>
                  <span className="mr-3">{day.dosesTaken} / {day.totalDoses} doses taken</span>
                  <span className={day.dosesTaken === day.totalDoses ? "text-green-500" : "text-red-500"}>
                    {day.dosesTaken === day.totalDoses ? "✅" : "❌"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bar Chart */}
        <div className="my-6">
          <Bar data={chartData} />
        </div>

      
      </div>
    </motion.div>
  );
};

export default MedicationProgress;
