import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("https://devops-collab-app.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}