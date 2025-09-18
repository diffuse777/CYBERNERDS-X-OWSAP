// src/components/Navbar.jsx
import { ShieldIcon, LockIcon, TerminalIcon } from "./Icons";
import { useState } from "react";
import logoCybernerds from "../assets/cybernerds.png";
import logoOwasp from "../assets/owaspLogo.png";
import logoEcCouncil from "../assets/ec-counicl-logo.png";
import { FaRegCalendarAlt, FaTrophy, FaUsers, FaEnvelope, FaUserShield } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useClientIp } from "./ClientIpContext";

export default function Navbar({ onNirfClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { ip, loading } = useClientIp();
  const [open, setOpen] = useState(false);

  // Helper to handle navigation
  function handleNav(e, hash) {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate(`/${hash}`);
    }
    // else, let anchor work as normal
  }

  return (
    <nav className="w-full py-3 px-4 md:px-6 flex items-center justify-between glass border-b-2 border-neon-green shadow-neon-green sticky top-0 z-50 backdrop-blur-glass">
      <div className="flex items-center gap-2 md:gap-4">
        <img src={logoCybernerds} alt="Cybernerds Logo" className="w-7 md:w-12 h-auto" style={{objectFit:'contain'}} />
        <span className="text-lg md:text-xl font-bold text-white">×</span>
        <img src={logoOwasp} alt="OWASP Logo" className="w-7 md:w-12 h-auto" style={{objectFit:'contain'}} />
        <span className="text-lg md:text-xl font-bold text-white">×</span>
        <img src={logoEcCouncil} alt="EC-Council Logo" className="w-7 md:w-12 h-auto" style={{objectFit:'contain'}} />
        <span className="text-lg md:text-xl font-bold text-white">×</span>
        <img src="/evercode.jpg" alt="Evercode Logo" className="w-7 md:w-12 h-auto" style={{objectFit:'contain'}} />
      </div>
      <button onClick={() => setOpen(v => !v)} className="sm:hidden px-3 py-1 rounded border border-white/20 text-white">Menu</button>
      <div className="hidden sm:flex gap-6 items-center">
        <span className="hidden sm:inline text-xs font-jetbrains text-white/70 bg-black/40 px-2 py-1 rounded border border-white/10">
          IP: {loading ? "..." : (ip || "N/A")}
        </span>
        {/* About */}
        <a href="#about" onClick={e => handleNav(e, "#about")}
          className="relative flex items-center gap-1 font-orbitron text-lg text-electric-blue transition group">
          <FaRegCalendarAlt className="text-xl mr-1 text-neon-green group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-neon-green transition drop-shadow-[0_0_8px_#00FF88]">About</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neon-green group-hover:w-full transition-all duration-300" style={{transitionProperty:'width'}}></span>
        </a>
        {/* Prizes */}
        <a href="#prizes" onClick={e => handleNav(e, "#prizes")}
          className="relative flex items-center gap-1 font-orbitron text-lg text-electric-blue transition group">
          <FaTrophy className="text-xl mr-1 text-cyber-purple group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-neon-green transition drop-shadow-[0_0_8px_#00FF88]">Prizes</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neon-green group-hover:w-full transition-all duration-300" style={{transitionProperty:'width'}}></span>
        </a>
        {/* NIRF Rankings */}
        <a href="#nirf" onClick={e => handleNav(e, "#nirf")}
          className="relative flex items-center gap-1 font-orbitron text-lg text-electric-blue transition group">
          <FaUsers className="text-xl mr-1 text-electric-blue group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-neon-green transition drop-shadow-[0_0_8px_#00FF88]">NIRF Rankings</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neon-green group-hover:w-full transition-all duration-300" style={{transitionProperty:'width'}}></span>
        </a>
        {/* Contact */}
        <a href="#contact" onClick={e => handleNav(e, "#contact")}
          className="relative flex items-center gap-1 font-orbitron text-lg text-electric-blue transition group">
          <FaEnvelope className="text-xl mr-1 text-neon-green group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-neon-green transition drop-shadow-[0_0_8px_#00FF88]">Contact</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neon-green group-hover:w-full transition-all duration-300" style={{transitionProperty:'width'}}></span>
        </a>
        {/* Admin */}
        <a href="/#/admin" className="relative flex items-center gap-1 font-orbitron text-lg text-electric-blue transition group">
          <FaUserShield className="text-xl mr-1 text-cyber-purple group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-neon-green transition drop-shadow-[0_0_8px_#00FF88]">Admin</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-neon-green group-hover:w-full transition-all duration-300" style={{transitionProperty:'width'}}></span>
        </a>
      </div>
      {open && (
        <div className="sm:hidden absolute top-full left-0 w-full glass border-b-2 border-neon-green shadow-neon-green">
          <div className="flex flex-col p-3 gap-3">
            <a href="#about" onClick={e => { setOpen(false); handleNav(e, "#about"); }} className="text-white">About</a>
            <a href="#prizes" onClick={e => { setOpen(false); handleNav(e, "#prizes"); }} className="text-white">Prizes</a>
            <a href="#nirf" onClick={e => { setOpen(false); handleNav(e, "#nirf"); }} className="text-white">NIRF Rankings</a>
            <a href="#contact" onClick={e => { setOpen(false); handleNav(e, "#contact"); }} className="text-white">Contact</a>
            <a href="/#/admin" onClick={() => setOpen(false)} className="text-white">Admin</a>
          </div>
        </div>
      )}
    </nav>
  );
}
