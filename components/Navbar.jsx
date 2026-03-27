'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../app/redux/actions/authActions';
import Link from 'next/link';
import logo from '../public/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-500/25 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-slate-100">
          <Image src={logo} width={42} height={22} alt="MedGuardian Logo" className="rounded-md" />
          <span>MedGuardian</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-500/30 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-300/50 hover:bg-slate-800/70"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-rose-950 transition hover:bg-rose-400"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
