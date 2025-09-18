// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
// import Table from "../components/Table";
import { readLogs, clearLogs, appendLog } from "../components/AdminLogs";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'participants'
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to admin login if not logged in
    try {
      const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
      if (!loggedIn) {
        navigate("/admin");
        return;
      }
    } catch {}
    let previousCount = 0;
    function fetchRegistrations() {
      const regs = JSON.parse(localStorage.getItem("registrations") || "[]");
      // Detect new registrations and log from admin side
      if (Array.isArray(regs) && regs.length > previousCount) {
        for (let i = previousCount; i < regs.length; i++) {
          const r = regs[i];
          appendLog("New registration", { team: r?.leader?.team, leader: r?.leader?.name });
        }
      }
      previousCount = regs.length;
      setRegistrations(regs);
    }
    function fetchLogs() {
      setLogs(readLogs());
    }
    fetchRegistrations();
    fetchLogs();
    const interval = setInterval(() => { fetchRegistrations(); fetchLogs(); }, 2000);
    return () => clearInterval(interval);
  }, []);

  function downloadPDF() {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.text("Participants List", 14, 16);
    const head = [
      "SNo", "Team Name", "Team", "Hostel/Dayschloar", "Paid", "Signature"
    ];
    let sno = 0;
    const sortedForPdf = [...registrations].sort((a, b) => (a?.leader?.team || '').localeCompare(b?.leader?.team || '', undefined, { sensitivity: 'base' }));
    const body = sortedForPdf.flatMap((r) =>
      (r.members || []).map((m) => [
        ++sno,
        r.leader?.team || '',
        m.name || '',
        m.residency || '',
        r.payment?.txn ? 'Yes' : 'No',
        ''
      ])
    );
    autoTable(doc, { head: [head], body, startY: 22 });
    doc.save("participants.pdf");
  }

  function exportParticipantsCSV() {
    try {
      const headers = ["Team Name", "Team Leader", "Contact No", "Payment Status", "Amount Paid (₹)"];
      const sorted = [...registrations].sort((a, b) => (a?.leader?.team || '').localeCompare(b?.leader?.team || '', undefined, { sensitivity: 'base' }));
      const rows = sorted.map(r => {
        const leaderName = (r.leader?.name || '').replaceAll(',', ' ');
        const teamName = (r.leader?.team || '').replaceAll(',', ' ');
        const leaderMemberIdx = (r.members || []).findIndex(m => m.role === 'Team Leader');
        const leaderPhone = leaderMemberIdx !== -1 ? (r.members[leaderMemberIdx].phone || '') : '';
        const paid = r.payment?.txn ? 'Yes' : 'No';
        const amount = r.payment?.txn ? 1750 : 0;
        return [teamName, leaderName, leaderPhone, paid, String(amount)];
      });
      const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'participants.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  }

  function clearAll() {
    const ok = window.confirm("This will remove ALL registrations from this browser. Continue?");
    if (!ok) return;
    try {
      localStorage.removeItem("registrations");
      setRegistrations([]);
      appendLog("All registrations cleared by admin");
    } catch (e) {
      console.error("Failed to clear registrations", e);
    }
  }

  function signOut() {
    // In a follow-up we can also clear an admin session flag
    try { localStorage.removeItem("adminLoggedIn"); } catch {}
    appendLog("Admin signed out");
    navigate("/admin");
  }

  const [logs, setLogs] = useState([]);
  function handleClearLogs() {
    const ok = window.confirm("Clear all admin logs?");
    if (!ok) return;
    clearLogs();
    setLogs([]);
  }
  function exportLogs() {
    try {
      const blob = new Blob([JSON.stringify(readLogs(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'admin-logs.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white font-orbitron flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-row w-full px-4 py-8 gap-6">
        {/* Sidebar */}
        <aside className="w-60 shrink-0 glass border-2 border-electric-blue shadow-electric-blue rounded-2xl h-fit self-start">
          <div className="p-4 flex flex-col gap-2">
            <div className="text-xl font-bold text-electric-blue mb-2">Admin Menu</div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`text-left px-3 py-2 rounded-lg border transition ${activeTab === 'dashboard' ? 'bg-electric-blue/20 border-electric-blue text-electric-blue' : 'bg-transparent border-white/10 text-white hover:bg-white/5'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`text-left px-3 py-2 rounded-lg border transition ${activeTab === 'participants' ? 'bg-neon-green/20 border-neon-green text-neon-green' : 'bg-transparent border-white/10 text-white hover:bg-white/5'}`}
            >
              Participants
            </button>
            <hr className="my-2 border-white/10" />
            <button onClick={signOut} className="text-left px-3 py-2 rounded-lg border border-accent-sky text-accent-sky hover:bg-accent-sky/10 transition">Sign Out</button>
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1 w-full max-w-6xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-6">
              <div className="mb-0 flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-3xl font-bold text-accent-red">Registered Participants</h2>
                <div className="flex gap-2">
                  <button onClick={clearAll} className="px-5 py-2 rounded-lg bg-transparent text-red-400 font-bold shadow-lg hover:scale-105 hover:bg-red-500/10 border-2 border-red-400 transition">Clear All</button>
                </div>
          </div>
          {registrations.length === 0 ? (
            <div className="text-center text-cyber-purple py-8">No registrations yet.</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border-2 border-electric-blue glass shadow-electric-blue">
              <table className="min-w-full text-left text-white font-jetbrains">
                <thead className="bg-electric-blue/10 text-neon-green">
                  <tr>
                    <th className="px-4 py-2">Team Number</th>
                    <th className="px-4 py-2">Team Name</th>
                    <th className="px-4 py-2">Problem Statement</th>
                    <th className="px-4 py-2">Leader Name</th>
                    <th className="px-4 py-2">Leader Email</th>
                    <th className="px-4 py-2">Txn ID</th>
                    <th className="px-4 py-2">Member Name</th>
                    <th className="px-4 py-2">Reg No</th>
                    <th className="px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r, i) => (
                    r.members.map((m, j) => (
                      <tr key={i + '-' + j} className="hover:bg-neon-green/10 transition">
                        {j === 0 ? (
                          <>
                            <td className="px-4 py-2 border-b border-electric-blue/20" rowSpan={r.members.length}>{i + 1}</td>
                            <td className="px-4 py-2 border-b border-electric-blue/20" rowSpan={r.members.length}>{r.leader?.team}</td>
                            <td className="px-4 py-2 border-b border-electric-blue/20" rowSpan={r.members.length}>{r.problem?.title}</td>
                            <td className="px-4 py-2 border-b border-electric-blue/20" rowSpan={r.members.length}>{r.leader?.name}</td>
                            <td className="px-4 py-2 border-b border-electric-blue/20" rowSpan={r.members.length}>{r.leader?.email}</td>
                            <td className="px-4 py-2 border-b border-electric-blue/20" rowSpan={r.members.length}>{r.payment?.txn}</td>
                          </>
                        ) : null}
                        <td className="px-4 py-2 border-b border-electric-blue/20">{m.name}</td>
                        <td className="px-4 py-2 border-b border-electric-blue/20">{m.reg}</td>
                        <td className="px-4 py-2 border-b border-electric-blue/20">{m.role}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          )}
              <div className="glass border-2 border-neon-green rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-neon-green">Admin Logs</h3>
              <div className="flex gap-2">
                <button onClick={exportLogs} className="px-3 py-1 rounded bg-transparent text-electric-blue border border-electric-blue hover:bg-electric-blue/10">Export</button>
                <button onClick={handleClearLogs} className="px-3 py-1 rounded bg-transparent text-red-400 border border-red-400 hover:bg-red-400/10">Clear</button>
              </div>
            </div>
            {logs.length === 0 ? (
              <div className="text-white/60">No logs yet.</div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                <table className="min-w-full text-left text-white font-jetbrains text-xs">
                  <thead className="bg-neon-green/10 text-neon-green">
                    <tr>
                      <th className="px-3 py-2">Time</th>
                      <th className="px-3 py-2">Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(l => (
                      <tr key={l.id} className="border-b border-white/10">
                        <td className="px-3 py-2 whitespace-nowrap">{new Date(l.time).toLocaleString()}</td>
                        <td className="px-3 py-2">
                          <pre className="whitespace-pre-wrap break-words text-white/80">{l.message}{l.username ? ` | user: ${l.username}` : ''}{l.team ? ` | team: ${l.team}` : ''}{l.leader ? ` | leader: ${l.leader}` : ''}{l.error ? ` | error: ${l.error}` : ''}</pre>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-3xl font-bold text-neon-green">Participants Overview</h2>
                <div className="flex gap-2">
                  <button onClick={downloadPDF} className="px-5 py-2 rounded-lg bg-neon-green text-black font-bold shadow-lg hover:scale-105 hover:bg-black hover:text-neon-green border-2 border-neon-green transition">Download PDF</button>
                  <button onClick={exportParticipantsCSV} className="px-5 py-2 rounded-lg bg-transparent text-neon-green font-bold shadow-lg hover:scale-105 hover:bg-neon-green/10 border-2 border-neon-green transition">Export CSV</button>
                </div>
              </div>
              {/* Team Payment Status Table */}
              <div className="overflow-x-auto rounded-2xl border-2 border-neon-green glass shadow-neon-green">
                <table className="min-w-full text-left text-white font-jetbrains">
                  <thead className="bg-neon-green/10 text-neon-green">
                    <tr>
                      <th className="px-4 py-2">Team Name</th>
                      <th className="px-4 py-2">Paid</th>
                      <th className="px-4 py-2">Amount Paid (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.length === 0 ? (
                      <tr><td className="px-4 py-4 text-center text-white/70" colSpan={3}>No teams yet.</td></tr>
                    ) : (
                      [...registrations]
                        .sort((a, b) => (a?.leader?.team || '').localeCompare(b?.leader?.team || '', undefined, { sensitivity: 'base' }))
                        .map((r, i) => (
                          <tr key={`pay-${i}`} className="hover:bg-neon-green/10 transition">
                            <td className="px-4 py-2 border-b border-neon-green/20">{r.leader?.team || '-'}</td>
                            <td className="px-4 py-2 border-b border-neon-green/20">{r.payment?.txn ? 'Yes' : 'No'}</td>
                            <td className="px-4 py-2 border-b border-neon-green/20">{r.payment?.txn ? 1750 : 0}</td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass border-2 border-neon-green rounded-2xl p-4 text-center">
                  <div className="text-sm text-white/70">Teams</div>
                  <div className="text-3xl font-bold text-neon-green">{registrations.length}</div>
                </div>
                <div className="glass border-2 border-electric-blue rounded-2xl p-4 text-center">
                  <div className="text-sm text-white/70">Participants</div>
                  <div className="text-3xl font-bold text-electric-blue">{registrations.reduce((sum, r) => sum + (r.members?.length || 0), 0)}</div>
                </div>
                <div className="glass border-2 border-accent-red rounded-2xl p-4 text-center">
                  <div className="text-sm text-white/70">Total Received (₹)</div>
                  <div className="text-3xl font-bold text-accent-red">{(registrations.filter(r => r?.payment?.txn).length) * 1750}</div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border-2 border-electric-blue glass shadow-electric-blue">
                <table className="min-w-full text-left text-white font-jetbrains">
                  <thead className="bg-electric-blue/10 text-neon-green">
                    <tr>
                      <th className="px-4 py-2">Team #</th>
                      <th className="px-4 py-2">Team Name</th>
                      <th className="px-4 py-2">Leader</th>
                      <th className="px-4 py-2">Members (count)</th>
                      <th className="px-4 py-2">Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.length === 0 ? (
                      <tr><td className="px-4 py-4 text-center text-white/70" colSpan={5}>No teams yet.</td></tr>
                    ) : (
                      [...registrations]
                        .sort((a, b) => (a?.leader?.team || '').localeCompare(b?.leader?.team || '', undefined, { sensitivity: 'base' }))
                        .map((r, i) => (
                        <tr key={i} className="hover:bg-neon-green/10 transition">
                          <td className="px-4 py-2 border-b border-electric-blue/20">{i + 1}</td>
                          <td className="px-4 py-2 border-b border-electric-blue/20">{r.leader?.team || '-'}</td>
                          <td className="px-4 py-2 border-b border-electric-blue/20">{r.leader?.name || '-'}</td>
                            <td className="px-4 py-2 border-b border-electric-blue/20">{r.members?.length || 0}</td>
                            <td className="px-4 py-2 border-b border-electric-blue/20">{r.payment?.txn ? 'Yes' : 'No'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto rounded-2xl border-2 border-neon-green glass shadow-neon-green">
                <table className="min-w-full text-left text-white font-jetbrains text-sm">
                  <thead className="bg-neon-green/10 text-neon-green">
                    <tr>
                      <th className="px-4 py-2">Team #</th>
                      <th className="px-4 py-2">Member Name</th>
                      <th className="px-4 py-2">Reg No</th>
                      <th className="px-4 py-2">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.flatMap((r, i) => (
                      (r.members || []).map((m, j) => (
                        <tr key={`m-${i}-${j}`} className="hover:bg-neon-green/10 transition">
                          <td className="px-4 py-2 border-b border-neon-green/20">{i + 1}</td>
                          <td className="px-4 py-2 border-b border-neon-green/20">{m.name}</td>
                          <td className="px-4 py-2 border-b border-neon-green/20">{m.reg}</td>
                          <td className="px-4 py-2 border-b border-neon-green/20">{m.role}</td>
                        </tr>
                      ))
                    ))}
                    {registrations.length === 0 && (
                      <tr><td className="px-4 py-4 text-center text-white/70" colSpan={4}>No participants yet.</td></tr>
                    )}
                  </tbody>
                </table>
          </div>
        </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
