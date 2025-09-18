import './App.css';

function App() {
  return (
  <div className="min-h-screen bg-dark-bg text-white font-orbitron flex flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <img src="/ec-council-logo.png" alt="EC-Council Logo" className="mx-auto w-32 mb-4" />
  <h1 className="text-4xl md:text-6xl font-bold text-accent-red glitch">Cybernerds, OWASP collaborated with <span className="text-accent-sky">EC-Council</span></h1>
  <p className="mt-4 text-lg md:text-2xl text-electric-blue">AI for Safer Digital Lives</p>
      </header>
  <main className="w-full max-w-2xl bg-[#181830]/80 rounded-xl p-8 shadow-lg border border-accent-sky">
  <h2 className="text-2xl font-bold mb-4 text-accent-red">Event Details</h2>
        <ul className="space-y-2 text-lg">
          <li><b>Date:</b> Oct 11 – 12 (24hrs Hackathon)</li>
          <li><b>Open to:</b> All departments / streams</li>
          <li><b>Venue:</b> TIFFAC Core</li>
          <li><b>Registration Fee:</b> ₹350 per head, Team of 5</li>
          <li><b>Total Prize Pool:</b> ₹20,000</li>
          <li><b>Special Rewards:</b> Internship for Top Performer + EE credits provided</li>
        </ul>
        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-6 py-2 rounded-lg bg-accent-red text-dark-bg font-bold shadow-lg hover:scale-105 transition">Register Now</button>
          <button className="px-6 py-2 rounded-lg bg-accent-sky text-white font-bold shadow-lg hover:scale-105 transition">Admin Login</button>
        </div>
      </main>
  <footer className="mt-12 text-accent-sky font-jetbrains text-sm opacity-80">&copy; 2025 Cybernerds Hackathon</footer>
    </div>
  );
}

export default App;
