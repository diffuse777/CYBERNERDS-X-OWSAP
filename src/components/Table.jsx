// src/components/Table.jsx
export default function Table({ data }) {
  if (!data.length) return <div className="text-center text-cyber-purple py-8">No registrations yet.</div>;
  return (
  <div className="overflow-x-auto rounded-2xl border-2 border-electric-blue glass shadow-electric-blue">
    <table className="min-w-full text-left text-white font-jetbrains">
      <thead className="bg-electric-blue/10 text-neon-green">
        <tr>
          <th className="px-4 py-2">Team Name</th>
          <th className="px-4 py-2">Leader</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Members</th>
          <th className="px-4 py-2">Txn ID</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-neon-green/10 transition">
            <td className="px-4 py-2 border-b border-electric-blue/20">{row.team}</td>
            <td className="px-4 py-2 border-b border-electric-blue/20">{row.leader}</td>
            <td className="px-4 py-2 border-b border-electric-blue/20">{row.email}</td>
            <td className="px-4 py-2 border-b border-electric-blue/20">{row.members}</td>
            <td className="px-4 py-2 border-b border-electric-blue/20">{row.txn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}
