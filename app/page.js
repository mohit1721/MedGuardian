'use client';

import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="glass-card fade-slide relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl">
        <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_1fr] md:p-10 lg:p-12">
          <section className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="inline-flex items-center rounded-full border border-slate-500/40 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Medication intelligence platform
              </p>
              <h1 className="text-4xl font-bold leading-tight text-slate-100 md:text-5xl">
                MedGuardian
              </h1>
              <p className="max-w-lg text-base text-slate-300 md:text-lg">
                A focused, reliable dashboard to manage medications, improve adherence, and keep daily dose tracking effortless.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Dose Accuracy', 'Live daily adherence status'],
                ['Smart Timeline', 'Dose-by-dose completion history'],
                ['Fast Actions', 'Mark, view, and update instantly'],
              ].map(([title, subtitle]) => (
                <div key={title} className="stat-card rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-200">{title}</p>
                  <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-2xl border border-slate-500/20 p-5 sm:p-6">
            <div className="mb-5 inline-flex rounded-xl border border-slate-500/30 p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  isLogin ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  !isLogin ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                Register
              </button>
            </div>

            {isLogin ? <Login /> : <Register />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
