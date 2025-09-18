const STORAGE_KEY = "adminLogs";

export function appendLog(message, meta = {}) {
  try {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const entry = {
      id: Date.now() + Math.random().toString(16).slice(2),
      time: new Date().toISOString(),
      message,
      ...meta,
    };
    logs.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.slice(0, 1000)));
  } catch {}
}

export function readLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearLogs() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}


