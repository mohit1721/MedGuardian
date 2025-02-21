import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicationHistory = ({ medicationId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get(`/api/medications/history/${medicationId}`);
      setHistory(response.data);
    };

    fetchHistory();
  }, [medicationId]);

  return (
    <div className="mt-4">
      {history.length === 0 ? (
        <p>No history available yet.</p>
      ) : (
        <ul>
          {history.map((entry) => (
            <li key={entry._id} className="p-2 border-b">
              <strong>{entry.date}:</strong> {entry.taken ? "Taken" : "Not Taken"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationHistory;
