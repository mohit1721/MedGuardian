import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../app/redux/actions/authActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and Password are required!');
      return;
    }

    setIsSubmitting(true);
    const success = await dispatch(login(email, password));
    if (success) {
      router.push('/dashboard');
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <h2 className="text-center text-2xl font-semibold text-slate-100">Welcome back</h2>
      <p className="text-center text-sm text-slate-400">Securely continue to your medication dashboard.</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none transition focus:border-sky-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none transition focus:border-sky-400"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-r-transparent" />
            Signing in...
          </>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};

export default Login;
