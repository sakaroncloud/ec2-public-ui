import React from "react";

interface StatusData {
  uptime: number;
  nodeVersion: string;
  memoryUsage: number;
}

interface StatusCardProps {
  isOnline: boolean;
  statusData: StatusData | null;
  error: string | null;
  loading?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({
  isOnline,
  statusData,
  error,
  loading = false,
}) => {
  return (
    <div className="card">
      <div className="card-title">
        Backend Status
        {loading && <div className="loading-spinner"></div>}
        <span
          className={`status-indicator ${isOnline ? "status-online" : "status-offline"}`}
          title={isOnline ? "Online" : "Offline"}
        ></span>
      </div>
      <div>
        {error ? (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        ) : isOnline && statusData ? (
          <div>
            <p
              style={{
                color: "var(--success)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Server is reachable
            </p>
            <div className="data-content">
              <div>Uptime: {statusData.uptime}</div>
              <div>Node: {statusData.nodeVersion}</div>
              <div>
                Memory: {(statusData.memoryUsage / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          </div>
        ) : (
          <div className="error-message">
            <span>🔴</span> Cannot reach backend (Private Subnet)
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
