/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      colors: {
        'neon-green': '#00FF88',
        'electric-blue': '#00CFFF',
        'cyber-purple': '#9D4EDD',
        'dark-bg': '#0D0D0D',
        'glass': 'rgba(255,255,255,0.08)',
        'white': '#fff',
        'black': '#000',
        'matrix-green': '#00FF88',
      },
      boxShadow: {
        'neon-green': '0 0 6px #00FF88, 0 0 12px #00FF88',
        'electric-blue': '0 0 6px #00CFFF, 0 0 12px #00CFFF',
        'cyber-purple': '0 0 6px #9D4EDD, 0 0 12px #9D4EDD',
        'glass': '0 4px 16px 0 rgba(31, 38, 135, 0.18)',
      },
      backdropBlur: {
        glass: '8px',
      },
    },
  },
  plugins: [],
};
