// src/components/Icons.jsx
export function ShieldIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v5c0 5.25-3.75 10-7 10s-7-4.75-7-10V7l7-4z" />
    </svg>
  );
}

export function LockIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <rect width="16" height="10" x="4" y="11" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  );
}

export function TerminalIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path d="M4 17h16M4 7l6 6-6 6" />
    </svg>
  );
}
