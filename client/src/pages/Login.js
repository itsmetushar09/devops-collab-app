import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://devops-collab-app.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.msg || "Login failed. Check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 transition hover:shadow-2xl">
        
        <h2 className="text-xl font-bold mb-4 text-center">
          🔐 Login
        </h2>

        <input
          className="border p-2 w-full mb-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}