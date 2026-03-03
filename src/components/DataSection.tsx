import React from "react";

interface DataSectionProps {
  data: Record<string, unknown> | null;
  loading: boolean;
}

const DataSection: React.FC<DataSectionProps> = ({ data, loading }) => {
  return (
    <div className="card">
      <div className="card-title">
        Private Data
        {loading && <div className="loading-spinner"></div>}
      </div>
      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "1rem",
          fontSize: "0.875rem",
        }}
      >
        Fetched from <code>/api/data</code> on the private network.
      </p>
      {data ? (
        <div className="data-content">{JSON.stringify(data, null, 2)}</div>
      ) : (
        <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
          {loading ? "Fetching secure data..." : "Waiting for connection..."}
        </p>
      )}
    </div>
  );
};

export default DataSection;
