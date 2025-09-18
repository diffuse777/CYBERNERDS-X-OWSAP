// src/components/Toast.jsx
import { useState } from "react";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-8 right-8 z-50 px-6 py-3 rounded-lg shadow-lg font-bold text-lg ${type === "success" ? "bg-green-500 text-white" : "bg-red-600 text-white"} animate-bounce`}>
      {message}
      <button className="ml-4 text-cyan-200" onClick={onClose}>✕</button>
    </div>
  );
}
