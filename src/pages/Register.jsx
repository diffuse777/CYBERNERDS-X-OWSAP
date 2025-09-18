// src/pages/Register.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormCard from "../components/FormCard";
import Toast from "../components/Toast";
import { useState } from "react";
import CyberBackground from "../components/CyberBackground";

export default function Register() {
  const [toast, setToast] = useState({ message: "", type: "success" });

  function handleSubmit(form, error) {
    if (error) {
      setToast({ message: error, type: "error" });
      setTimeout(() => setToast({ message: "", type: "success" }), 3000);
      return;
    }
    // Save registration to localStorage
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    registrations.push(form);
    localStorage.setItem("registrations", JSON.stringify(registrations));
    setToast({ message: "Registration successful!", type: "success" });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white font-orbitron flex flex-col relative overflow-hidden">
      <CyberBackground />
      <Navbar />
      <main className="flex-1 flex items-start justify-start w-full px-0 md:px-4 py-6">
        <FormCard onSubmit={handleSubmit} />
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
