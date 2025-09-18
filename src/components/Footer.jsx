// src/components/Footer.jsx
import { useClientIp } from "./ClientIpContext";

export default function Footer() {
  const { ip, loading } = useClientIp();
  return (
    <footer className="w-full py-4 px-6 glass border-t-4 border-neon-green text-center text-electric-blue font-jetbrains text-sm opacity-90 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="font-orbitron text-neon-green">Designed and maintained BY WEB DEVELOPMENT TEAM CYBERENDS, KARE</span>
        <span className="text-white/70 font-jetbrains">| IP: {loading ? "..." : (ip || "N/A")}</span>
      </div>
    </footer>
  );
}
