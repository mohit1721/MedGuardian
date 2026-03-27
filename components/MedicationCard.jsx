'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedicationAction, markAsTakenAction } from '../app/redux/actions/medicationActions';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import MedicationForm from './MedicationForm';
import ConfirmationModal from './ConfirmationModal';
import { useRouter } from 'next/navigation';

const MedicationCard = ({ medication }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const medications = useSelector((state) => state.medications.medications || []);
  const updatedMedication = medications.find((med) => med._id === medication._id) || medication;
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [loadingDose, setLoadingDose] = useState(null);
  const router = useRouter();
  const today = moment().format('DD-MM-YYYY');

  const handleMarkAsTaken = async (doseTime) => {
    try {
      setLoadingDose(doseTime);
      await dispatch(markAsTakenAction(medication._id, doseTime));
      setLoadingDose(null);
    } catch (error) {
      setLoadingDose(null);
      toast.error('Failed to mark medication as taken.');
    }
  };

  const handleDelete = async () => {
    setLoadingDose(true);
    try {
      await dispatch(deleteMedicationAction(medication._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.log('Error deleting medication:', error);
    } finally {
      setLoadingDose(false);
    }
  };

  const hasDoseBeenTaken = (doseTime) => {
    return updatedMedication?.takenHistory?.some(
      (entry) => moment(entry.date).format('DD-MM-YYYY') === today && entry.times.includes(doseTime),
    );
  };

  const totalSlots = medication?.time?.length || 0;
  const takenToday = medication?.time?.filter((slot) => hasDoseBeenTaken(slot)).length || 0;
  const adherence = totalSlots ? Math.round((takenToday / totalSlots) * 100) : 0;

  return (
    <motion.article
      className="glass-card group rounded-2xl border border-slate-500/25 p-5 capitalize"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{medication?.name}</h3>
          <p className="text-sm text-slate-400">{medication?.dosage}</p>
        </div>
        <span className="rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-200">
          {adherence}% today
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-slate-600/35 bg-slate-900/60 p-3 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Taken</p>
          <p className="text-xl font-bold text-emerald-300">{takenToday}</p>
        </div>
        <div className="rounded-xl border border-slate-600/35 bg-slate-900/60 p-3 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Remaining</p>
          <p className="text-xl font-bold text-amber-300">{Math.max(totalSlots - takenToday, 0)}</p>
        </div>
      </div>

      <div className="space-y-2">
        {medication?.time?.map((doseTime, index) => {
          const taken = hasDoseBeenTaken(doseTime);
          return (
            <div key={index} className="flex items-center justify-between rounded-xl border border-slate-600/35 bg-slate-900/55 p-3">
              <div>
                <p className="text-sm font-medium text-slate-200">{doseTime}</p>
                <p className={`text-xs ${taken ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {taken ? 'Taken today' : 'Pending'}
                </p>
              </div>
              <button
                onClick={() => handleMarkAsTaken(doseTime)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  taken
                    ? 'cursor-not-allowed bg-slate-700/80 text-slate-400'
                    : 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                }`}
                disabled={taken || loadingDose === doseTime}
              >
                {loadingDose === doseTime ? 'Saving...' : taken ? 'Done' : 'Mark Taken'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-rose-950 transition hover:bg-rose-400"
        >
          Delete
        </button>
        <button
          onClick={() => setSelectedMedication(medication)}
          className="flex-1 rounded-lg border border-slate-400/35 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800/65"
        >
          Edit
        </button>
        <button
          onClick={() => router.push(`/medication-progress/${medication?._id}`)}
          className="flex-1 rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
        >
          Analytics
        </button>
      </div>

      {selectedMedication && <MedicationForm setShowModal={() => setSelectedMedication(null)} medication={selectedMedication} />}

      {showDeleteModal && (
        <ConfirmationModal setShowModal={setShowDeleteModal} medicationId={medication?._id} handleDelete={handleDelete} />
      )}
    </motion.article>
  );
};

export default MedicationCard;
