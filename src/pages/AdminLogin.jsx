// src/pages/AdminLogin.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { appendLog } from "../components/AdminLogs";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Replace with API call
    if (form.username === "admin" && form.password === "cybernerds2025") {
      setToast({ message: "Login successful!", type: "success" });
      setError("");
      try { localStorage.setItem("adminLoggedIn", "true"); } catch {}
      appendLog("Admin logged in", { username: form.username });
      navigate("/dashboard");
    } else {
      setToast({ message: "Invalid credentials", type: "error" });
      setError("Invalid admin credentials");
      appendLog("Failed admin login", { username: form.username });
    }
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white font-orbitron flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-[#181830]/80 border border-accent-sky rounded-xl p-8 shadow-xl flex flex-col gap-4 max-w-md w-full mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold text-accent-red mb-2">Admin Login</h2>
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="bg-transparent border-b-2 border-accent-red focus:border-accent-sky outline-none py-2 px-3 text-white placeholder-accent-sky neon-glow" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="bg-transparent border-b-2 border-accent-red focus:border-accent-sky outline-none py-2 px-3 text-white placeholder-accent-sky neon-glow" />
          {error && (
            <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>
          )}
          <button type="submit" className="mt-4 px-6 py-2 rounded-lg bg-neon-green text-black font-bold shadow-lg hover:scale-105 hover:bg-black hover:text-neon-green border-2 border-neon-green transition">Login</button>
        </form>
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
      </main>
      <Footer />
    </div>
  );
}
