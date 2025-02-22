// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login, register } from "../app/redux/actions/authActions";
// import {toast} from 'react-hot-toast'
// import { useRouter } from "next/navigation";
// const Register = () => {
//   const dispatch = useDispatch();
//   const router= useRouter()
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const success = await register(name, email, password);

//     if (success) {
//       toast.success("Account created! Please log in.");
//       router.push("/");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleRegister} className="bg-[#EFE9D5] text-black/50 p-6 rounded-lg shadow-lg mx-auto max-w-md w-full">
//       <h2 className="text-2xl text-black/50 font-semibold text-center mb-6">Register New User</h2>
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="block bg-[#EFE9D5] w-full p-3 mb-4 border border-gray-300 rounded"
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="block bg-[#EFE9D5] w-full p-3 mb-4 border border-gray-300 rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         disabled={loading}
//         onChange={(e) => setPassword(e.target.value)}
//         className="block bg-[#EFE9D5] w-full p-3 mb-4 border border-gray-300 rounded"
//       />
//       <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
//       {loading ? "Creating account..." : "Register"}
//       </button>
//     </form>
//   );
// };

// export default Register;
// **
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../app/redux/actions/authActions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Basic Frontend Validation
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    const result = await dispatch(register(name, email, password));

    if (result.success) {
      toast.success("Account created! Please log in.");
      router.push("/");
    } else {
      // Display backend validation errors
      setErrors((prev) => ({ ...prev, message: result.message }));
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="bg-[#EFE9D5] text-black/50 p-6 rounded-lg shadow-lg mx-auto max-w-md w-full">
      <h2 className="text-2xl text-black/50 font-semibold text-center mb-6">Register New User</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block bg-[#EFE9D5] w-full p-3 mb-2 border border-gray-300 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block bg-[#EFE9D5] w-full p-3 mb-2 border border-gray-300 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
        className="block bg-[#EFE9D5] w-full p-3 mb-2 border border-gray-300 rounded"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
