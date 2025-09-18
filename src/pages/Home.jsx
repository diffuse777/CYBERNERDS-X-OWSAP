// src/pages/Home.jsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";
import { ShieldIcon, LockIcon, TerminalIcon } from "../components/Icons";
import { FaRegCalendarAlt, FaUsers, FaMapMarkerAlt, FaRupeeSign, FaTrophy, FaBriefcase, FaEnvelope, FaPhoneAlt, FaGlobe, FaUniversity, FaCogs, FaLightbulb, FaLeaf } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useClientIp } from "../components/ClientIpContext";
// Asset imports for production builds
import logoCybernerds from "../assets/cybernerds.png";
import logoOwasp from "../assets/owaspLogo.png";
import logoEcCouncil from "../assets/ec-counicl-logo.png";
import logoKalasalingam from "../assets/kalasalingam-logo.png";
import { appendLog } from "../components/AdminLogs";
import CircuitBackground from "../components/CircuitBackground";

export default function Home() {
  const [showNirf, setShowNirf] = useState(false);
  const [showSecurityNotice, setShowSecurityNotice] = useState(true);
  const { ip, loading: ipLoading } = useClientIp();
  const [visitorLogged, setVisitorLogged] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSecurityNotice(false), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visitorLogged) return;
    // Log visitor when IP is available or after small delay
    if (!ipLoading) {
      try {
        appendLog("Visitor session start", { ip: ip || "unknown", ua: navigator.userAgent || "" });
      } catch {}
      setVisitorLogged(true);
    }
  }, [ipLoading, ip, visitorLogged]);

  return (
    <div className="min-h-screen bg-dark-bg text-white font-orbitron flex flex-col relative overflow-hidden">
      <CircuitBackground />
      {/* Security Notice Popup - 10s */}
      {showSecurityNotice && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowSecurityNotice(false)} />
          <div className="relative z-[71] glass border-2 border-accent-red shadow-electric-blue rounded-2xl p-6 max-w-lg w-[90%] text-center">
            <div className="font-orbitron text-2xl font-bold text-accent-red mb-2">Security Notice</div>
            <div className="text-white/90 text-sm md:text-base font-jetbrains mb-4">
              For security purposes, your IP{!ipLoading && ip ? ` (${ip})` : ''} is being monitored during this session.
            </div>
            <button
              onClick={() => setShowSecurityNotice(false)}
              className="px-5 py-2 rounded-lg bg-neon-green text-black font-bold border-2 border-neon-green hover:bg-black hover:text-neon-green transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
  {/* Matrix Parallax BG */}
  <div className="matrix-bg z-10" />
  {/* Logos Row Top Left */}
  <div className="absolute top-4 left-4 z-50 flex flex-wrap items-center gap-2 md:gap-4 max-w-[92vw]">
        <img src={logoCybernerds} alt="Cybernerds Logo" className="w-10 md:w-14 h-auto" style={{objectFit:'contain'}} />
        <span className="text-xl md:text-2xl font-bold text-white">×</span>
        <img src={logoOwasp} alt="OWASP Logo" className="w-10 md:w-14 h-auto" style={{objectFit:'contain'}} />
        <span className="text-xl md:text-2xl font-bold text-white">×</span>
        <img src={logoEcCouncil} alt="EC-Council Logo" className="w-10 md:w-14 h-auto" style={{objectFit:'contain'}} />
        <span className="text-xl md:text-2xl font-bold text-white">×</span>
        <img src="/evercode.jpg" alt="Evercode Logo" className="w-10 md:w-14 h-auto" style={{objectFit:'contain'}} />
      </div>
    <Navbar onNirfClick={() => setShowNirf((v) => !v)} />
    <main className="flex-1 w-full px-2 md:px-0 flex flex-col items-center z-20 relative">
        {/* HERO SECTION */}
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center mt-12 mb-12">
          <img src={logoKalasalingam} alt="Kalasalingam Logo" className="mb-4 w-72 md:w-[28rem] h-auto" style={{objectFit:'contain'}} />
          <div className="mb-4 flex flex-col items-center">
            <span className="font-orbitron text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase text-neon-green text-center tracking-tight block whitespace-nowrap overflow-hidden text-ellipsis">
              CYBERNERDS <span className="text-accent-sky">×</span> <span className="text-cyber-purple">OWASP</span> <span className="text-accent-red">×</span> <span className="text-white">EC-COUNCIL</span> <span className="text-accent-sky">×</span> <span className="text-neon-green">EVERCODE</span>
            </span>
            <span className="font-orbitron text-xl md:text-3xl font-bold uppercase text-electric-blue text-center mt-2 tracking-widest block">HACKATHON 2K25</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
            <span className="flex items-center gap-2 text-neon-green font-jetbrains"><FaRegCalendarAlt className="text-neon-green" /> Oct 11-12, 2025</span>
            <span className="flex items-center gap-2 text-electric-blue font-jetbrains"><FaMapMarkerAlt className="text-electric-blue" /> TIFFAC Core</span>
          </div>
          {/* Countdown Timer - digital, boxed, neon green */}
          <div className="w-full flex flex-col items-center mb-8">
            <span className="uppercase text-neon-green text-base font-orbitron tracking-widest mb-2">Event Starts In</span>
            <CountdownTimer />
          </div>
          <div className="flex gap-4 mt-2">
            <a href="/#/register" className="px-8 py-3 rounded-lg bg-neon-green text-black font-orbitron font-bold text-lg border-2 border-neon-green hover:bg-black hover:text-neon-green hover:shadow-none transition-all duration-200 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-neon-green animate-pulse" /> REGISTER NOW
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full max-w-6xl mx-auto mt-12 mb-8">
          <div className="glass border-4 border-cyber-purple shadow-cyber-purple rounded-3xl p-8">
            <h2 className="text-4xl font-extrabold text-cyber-purple text-center mb-10 font-orbitron tracking-wide">ABOUT THE EVENT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Event Details */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-neon-green shadow-neon-green p-6 items-center">
                  <FaRegCalendarAlt className="text-3xl text-neon-green mr-4" />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Event Details:</span>
                    <span className="font-orbitron text-lg text-white">Oct 11 – 12 (<span className='text-neon-green font-bold'>24hrs Hackathon</span>)</span>
                  </div>
                </div>
              </div>
              {/* Venue */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-electric-blue shadow-electric-blue p-6 items-center">
                  <FaMapMarkerAlt className="text-3xl text-electric-blue mr-4" />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Venue:</span>
                    <span className="font-orbitron text-lg text-white">TIFFAC Core</span>
                  </div>
                </div>
              </div>
              {/* Theme */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-cyber-purple shadow-cyber-purple p-6 items-center">
                  <FaBriefcase className="text-3xl text-cyber-purple mr-4" />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Theme:</span>
                    <span className="font-orbitron text-lg text-white">AI for Safer Digital Lives</span>
                  </div>
                </div>
              </div>
              {/* Registration Fee */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-neon-green shadow-neon-green p-6 items-center">
                  <FaRupeeSign className="text-3xl text-neon-green mr-4" />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Registration Fee:</span>
                    <span className="font-orbitron text-lg text-white"><span className='text-neon-green font-bold'>₹350 per head</span> (<span className='text-neon-green font-bold'>₹1,750 per team</span>), Team of 5</span>
                  </div>
                </div>
              </div>
              {/* Open to */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-electric-blue shadow-electric-blue p-6 items-center">
                  <FaUsers className="text-3xl text-electric-blue mr-4" />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Open to:</span>
                    <span className="font-orbitron text-lg text-white">All departments / streams</span>
                  </div>
                </div>
              </div>
              {/* Total Prize Pool */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-cyber-purple shadow-cyber-purple p-6 items-center">
                  <FaTrophy className="text-3xl text-cyber-purple mr-4" />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Total Prize Pool:</span>
                    <span className="font-orbitron text-lg text-neon-green font-extrabold">₹20,000</span>
                  </div>
                </div>
              </div>
              {/* Organised by */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-neon-green shadow-neon-green p-6 items-center">
                  <ShieldIcon className="w-7 h-7 mr-4" style={{ color: '#58dd4eff' }} />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Organised by:</span>
                    <span className="font-orbitron text-lg text-white">Cybernerds, OWASP, EC-Council &amp; Evercode</span>
                  </div>
                </div>
              </div>
              {/* Special Rewards */}
              <div className="flex items-stretch col-span-1 md:col-span-1">
                <div className="flex w-full bg-black/80 rounded-2xl border-4 border-electric-blue shadow-electric-blue p-6 items-center">
                  <LockIcon className="w-7 h-7 mr-4" style={{ color: '#3ad6dbff' }} />
                  <div className="flex flex-col w-full">
                    <span className="font-orbitron text-xl font-bold text-white">Special Rewards:</span>
                    <span className="font-orbitron text-lg text-white">Internship for Top Performer + EE credits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* PRIZE POOL SECTION */}
        <section id="prizes" className="w-full max-w-4xl mx-auto mt-12 mb-8 glass border-2 border-cyber-purple shadow-cyber-purple rounded-2xl p-8 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-cyber-purple neon-glow text-center mb-4 font-orbitron drop-shadow-[0_0_12px_#9D4EDD]">PRIZE POOL</h2>
          <div className="flex items-center gap-3 text-white/90 text-xl md:text-2xl font-orbitron">
            <FaTrophy className="text-3xl md:text-4xl text-neon-green drop-shadow-[0_0_8px_#00FF88]" />
            <span>Total Prize Pool:</span>
            <span className="text-neon-green font-extrabold">₹20,000</span>
          </div>
        </section>

        {/* NIRF RANKINGS SECTION - Always visible, above contact, horizontal layout */}
        <section id="nirf" className="w-full max-w-5xl mx-auto mt-8 mb-8 glass border-4 border-electric-blue shadow-electric-blue rounded-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center text-electric-blue mb-6 font-orbitron">NIRF RANKINGS</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <FaGlobe className="text-2xl md:text-3xl text-neon-green mb-1" />
              <span className="font-orbitron text-lg text-white">Overall</span>
              <span className="font-orbitron text-2xl font-bold text-neon-green">48th</span>
            </div>
            <div className="flex flex-col items-center">
              <FaUniversity className="text-2xl md:text-3xl text-cyber-purple mb-1" />
              <span className="font-orbitron text-lg text-white">University</span>
              <span className="font-orbitron text-2xl font-bold text-cyber-purple">28th</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCogs className="text-2xl md:text-3xl text-electric-blue mb-1" />
              <span className="font-orbitron text-lg text-white">Engineering</span>
              <span className="font-orbitron text-2xl font-bold text-electric-blue">33rd</span>
            </div>
            <div className="flex flex-col items-center">
              <FaLightbulb className="text-2xl md:text-3xl text-neon-green mb-1" />
              <span className="font-orbitron text-lg text-white">Innovation</span>
              <span className="font-orbitron text-2xl font-bold text-neon-green">11th - 50th</span>
            </div>
            <div className="flex flex-col items-center">
              <FaLeaf className="text-2xl md:text-3xl text-cyber-purple mb-1" />
              <span className="font-orbitron text-lg text-white">SDG Institutions</span>
              <span className="font-orbitron text-2xl font-bold text-cyber-purple">11th - 50th</span>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full max-w-4xl mx-auto mt-12 mb-8">
          <div className="glass border-4 border-electric-blue shadow-electric-blue rounded-3xl p-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-electric-blue neon-glow font-orbitron drop-shadow-[0_0_12px_#00CFFF] mb-4 text-center">CONTACT US</h2>
            <div className="glass border-2 border-cyber-purple rounded-xl p-6 flex flex-col shadow-cyber-purple">
            <div className="flex items-center gap-2 mb-3 text-cyber-purple font-bold drop-shadow-[0_0_8px_#9D4EDD]"><FaPhoneAlt className="text-cyber-purple" /> Contacts</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90 text-sm font-jetbrains">
              <div className="rounded-lg border border-white/10 p-3">
                <div className="font-bold text-neon-green">Nagothi Dinesh</div>
                <div>Sec: S18</div>
                <div>Reg no: 99230040244</div>
                <div>Contact: 9515711265</div>
              </div>
              <div className="rounded-lg border border-white/10 p-3">
                <div className="font-bold text-neon-green">Sai Keerthi</div>
                <div>Sec: S11</div>
                <div>Reg no: 99230040917</div>
                <div>Contact: 8074723602</div>
              </div>
              <div className="rounded-lg border border-white/10 p-3">
                <div className="font-bold text-neon-green">Seepana Ajay</div>
                <div>Sec: S05</div>
                <div>Reg no: 99230040420</div>
                <div>Contact: 8374646618</div>
              </div>
              <div className="rounded-lg border border-white/10 p-3">
                <div className="font-bold text-neon-green">Harini Sri K</div>
                <div>Sec: S19</div>
                <div>Reg no: 99230041136</div>
                <div>Contact: 8300048238</div>
              </div>
            </div>
          </div>
          </div>
        </section>

        
      </main>
  <Footer />
    </div>
  );
}
