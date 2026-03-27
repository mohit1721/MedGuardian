import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../app/redux/actions/authActions';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!name || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    setLoading(true);
    const result = await dispatch(register(name, email, password));

    if (result.success) {
      toast.success('Account created! Please log in.');
      router.push('/');
    } else {
      setErrors((prev) => ({ ...prev, message: result.message }));
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-3">
      <h2 className="text-center text-2xl font-semibold text-slate-100">Create account</h2>
      <p className="text-center text-sm text-slate-400">Start tracking your health in under a minute.</p>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none transition focus:border-sky-400"
      />
      {errors.name && <p className="text-xs text-rose-300">{errors.name}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none transition focus:border-sky-400"
      />
      {errors.email && <p className="text-xs text-rose-300">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-slate-500/35 bg-slate-900/70 p-3 text-sm text-slate-100 outline-none transition focus:border-sky-400"
      />
      {errors.password && <p className="text-xs text-rose-300">{errors.password}</p>}
      {errors.message && <p className="text-xs text-rose-300">{errors.message}</p>}

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
