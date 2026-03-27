'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createMedicationAction, modifyMedicationAction } from '../app/redux/actions/medicationActions';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { setMedications } from '@/app/redux/reducers/medicationReducer';
import moment from 'moment-timezone';

const MedicationForm = ({ setShowModal, medication = null }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    time: ['12:00 AM'],
    startDate: '',
    duration: '',
    reminderEnabled: true,
  });

  useEffect(() => {
    if (medication) {
      setFormData({
        ...medication,
        time: medication.time?.length >= 0 ? [...medication.time] : ['12:00 AM'],
      });
    }
  }, [medication]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (index, time) => {
    if (!time) return;
    const istTime = moment(time, 'hh:mm A').tz('Asia/Kolkata').format('hh:mm A');
    const newTimeArray = [...formData.time];
    newTimeArray[index] = istTime;
    setFormData({ ...formData, time: newTimeArray });
  };

  const addTimeSlot = () => {
    setFormData({ ...formData, time: [...formData.time, '12:00 AM'] });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 text-slate-100">
      <div className="absolute inset-0 bg-slate-950/60" onClick={() => setShowModal(false)} />

      <div className="glass-card relative z-50 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-500/30 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{medication ? 'Edit Medication' : 'Add Medication'}</h2>
          <button onClick={() => setShowModal(false)} className="rounded-md border border-slate-500/30 px-2 py-1 text-slate-300 hover:bg-slate-800/65">
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Medication Name"
            required
            className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none focus:border-sky-400"
          />

          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="Dosage"
            required
            className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none focus:border-sky-400"
          />

          <div className="space-y-3">
            {formData.time.map((time, index) => (
              <div key={index} className="flex items-center gap-2">
                <TimePicker
                  onChange={(newTime) => handleTimeChange(index, newTime)}
                  value={time}
                  format="hh:mm a"
                  className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 px-3 py-2"
                  disableClock
                  clockIcon={null}
                  clearIcon={null}
                />
                {formData.time.length > 1 && (
                  <button type="button" onClick={() => removeTimeSlot(index)} className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-rose-950 hover:bg-rose-400">
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addTimeSlot} className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-300">
              + Add Time
            </button>
          </div>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none focus:border-sky-400"
          />

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min={0}
            className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="Duration (days)"
          />

          <div className="flex items-center justify-between rounded-xl border border-slate-600/35 bg-slate-900/60 px-3 py-2">
            <span className="text-sm text-slate-300">Reminders enabled</span>
            <button
              type="button"
              className={`relative h-6 w-12 rounded-full transition ${formData.reminderEnabled ? 'bg-emerald-400' : 'bg-slate-600'}`}
              onClick={() => setFormData({ ...formData, reminderEnabled: !formData.reminderEnabled })}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-slate-950 transition ${
                  formData.reminderEnabled ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-slate-500/35 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800/65">
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : medication ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationForm;
