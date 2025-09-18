import { createContext, useContext, useEffect, useState } from "react";

const ClientIpContext = createContext({ ip: "", loading: true, error: "" });

export function ClientIpProvider({ children }) {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchIp() {
      setLoading(true);
      setError("");
      try {
        // Try two public endpoints; fall back gracefully
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch("https://api.ipify.org?format=json", { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("Failed to fetch IP (ipify)");
        const data = await res.json();
        if (isMounted) setIp(data.ip || "");
      } catch (e1) {
        try {
          const res2 = await fetch("https://ifconfig.me/ip");
          const text = await res2.text();
          if (isMounted) setIp(text.trim());
        } catch (e2) {
          if (isMounted) setError("Unable to fetch IP");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchIp();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ClientIpContext.Provider value={{ ip, loading, error }}>
      {children}
    </ClientIpContext.Provider>
  );
}

export function useClientIp() {
  return useContext(ClientIpContext);
}


