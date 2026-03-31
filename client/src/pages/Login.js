import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)} />
        <input type="password" className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}