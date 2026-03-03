import { useState, useEffect } from "react";
import "./App.css"; // Vite default, but we'll use index.css for main layout
import StatusCard from "./components/StatusCard";
import DataSection from "./components/DataSection";
import EchoForm from "./components/EchoForm";

interface StatusData {
  uptime: number;
  nodeVersion: string;
  memoryUsage: number;
}

interface PrivateData {
  [key: string]: unknown;
}

interface EchoResponse {
  serverMessage: string;
  echoTimestamp: string;
}

function App() {
  const [isOnline, setIsOnline] = useState(false);
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [privateData, setPrivateData] = useState<PrivateData | null>(null);
  const [echoResponse, setEchoResponse] = useState<EchoResponse | null>(null);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingEcho, setLoadingEcho] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Health Check: Polling the private API /status endpoint.
   * NOTE: This app is hosted in a PUBLIC Subnet.
   * It reaches the PRIVATE Subnet via the corporate/VPC proxy (or dev proxy here).
   */
  const checkStatus = async () => {
    setLoadingStatus(true);
    try {
      const response = await fetch("/api/status");
      if (!response.ok) throw new Error("Backend unreachable");
      const data = await response.json();
      setStatusData(data);
      setIsOnline(true);
      setError(null);
    } catch (err) {
      console.error("Status check failed:", err);
      setIsOnline(false);
      setStatusData(null);
      setError("Cannot reach private backend nodes");
    } finally {
      setLoadingStatus(false);
    }
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch("/api/data");
      if (!response.ok) throw new Error("Failed to fetch private data");
      const data = await response.json();
      setPrivateData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleEcho = async (input: string) => {
    setLoadingEcho(true);
    try {
      const response = await fetch("/api/echo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      setEchoResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEcho(false);
    }
  };

  useEffect(() => {
    checkStatus();
    fetchData();

    // Poll status every 10 seconds to detect server downtime
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <header>
        <span className="badge badge-public">Public Subnet</span>
        <h1>Hybrid Cloud Gateway</h1>
        <p className="subtitle">
          Securely bridging Public frontend and Private API
        </p>
      </header>

      <main>
        <div className="grid">
          <StatusCard
            isOnline={isOnline}
            statusData={statusData}
            error={error}
            loading={loadingStatus}
          />

          <DataSection data={privateData} loading={loadingData} />

          <EchoForm
            onEcho={handleEcho}
            loading={loadingEcho}
            response={echoResponse}
          />
        </div>
      </main>

      <div className="footer-info">
        <p>
          Architecture Trace:
          <strong> Browser</strong> →
          <span style={{ color: "var(--primary)" }}>
            {" "}
            Public EC2 (React/Vite Proxy)
          </span>{" "}
          →<span style={{ color: "#92400e" }}> Private EC2 (Express API)</span>
        </p>
      </div>
    </div>
  );
}

export default App;
