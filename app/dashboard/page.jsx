'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MedicationCard from '../../components/MedicationCard';
import Navbar from '../../components/Navbar';
import { fetchMedications } from '../../app/redux/actions/medicationActions';
import MedicationForm from '../../components/MedicationForm';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const Dashboard = () => {
  const dispatch = useDispatch();
  const medicationsFromStore = useSelector((state) => state.medications?.medications || []);
  const medications = useMemo(() => [...medicationsFromStore], [medicationsFromStore]);

  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user._id) {
      router.push('/');
      return;
    }

    setLoading(true);
    dispatch(fetchMedications(user._id)).finally(() => setLoading(false));
  }, [dispatch, user, router]);

  const stats = useMemo(() => {
    const today = moment().format('DD-MM-YYYY');
    const activeMeds = medications.length;
    const totalTodayDoses = medications.reduce((sum, med) => sum + (med?.time?.length || 0), 0);

    const takenToday = medications.reduce((sum, med) => {
      const entry = med?.takenHistory?.find((item) => moment(item.date).format('DD-MM-YYYY') === today);
      return sum + (entry?.times?.length || 0);
    }, 0);

    const adherence = totalTodayDoses ? Math.round((takenToday / totalTodayDoses) * 100) : 0;
    return { activeMeds, totalTodayDoses, takenToday, adherence };
  }, [medications]);

  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl p-4 sm:p-6">
        <section className="fade-slide mb-6 flex flex-col gap-4 rounded-2xl border border-slate-600/30 bg-slate-900/45 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Welcome, <span className="text-sky-300">{user?.name}</span>
            </h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">Your health command center for today&apos;s dose schedule and adherence.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            + Add Medication
          </button>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Active Medications', stats.activeMeds, 'Currently tracked'],
            ["Today\'s Planned Doses", stats.totalTodayDoses, 'Scheduled for today'],
            ['Doses Taken Today', stats.takenToday, 'Marked completed'],
            ['Adherence', `${stats.adherence}%`, 'Completion progress'],
          ].map(([label, value, desc], index) => (
            <article
              key={label}
              className="stat-card fade-slide rounded-2xl p-4"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-100">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{desc}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <p className="rounded-xl border border-slate-600/30 bg-slate-900/45 p-6 text-center text-slate-300">Loading medications...</p>
          ) : medications.length > 0 ? (
            medications.map((med, index) => <MedicationCard key={med._id || index} medication={med} />)
          ) : (
            <p className="rounded-xl border border-slate-600/30 bg-slate-900/45 p-6 text-center text-slate-300">
              No medications found. Add your first medication to start tracking.
            </p>
          )}
        </section>
      </main>

      {showModal && <MedicationForm setShowModal={setShowModal} />}
    </div>
  );
};

export default Dashboard;
