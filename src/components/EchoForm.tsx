import React, { useState } from "react";

interface EchoResponse {
  serverMessage: string;
  echoTimestamp: string;
}

interface EchoFormProps {
  onEcho: (input: string) => Promise<void>;
  loading: boolean;
  response: EchoResponse | null;
}

const EchoForm: React.FC<EchoFormProps> = ({ onEcho, loading, response }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onEcho(input);
    }
  };

  return (
    <div className="card">
      <div className="card-title">Echo Communication</div>
      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "1.5rem",
          fontSize: "0.875rem",
        }}
      >
        Send a POST request to the private API and receive a reflected response.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="echo-input">Message to Server</label>
          <input
            id="echo-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "Sending..." : "Send to Private API"}
        </button>
      </form>

      {response && (
        <div className="echo-response">
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "0.5rem",
            }}
          >
            Server Response
          </p>
          <p style={{ fontWeight: 500 }}>{response.serverMessage}</p>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              marginTop: "0.5rem",
            }}
          >
            Received at: {new Date(response.echoTimestamp).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default EchoForm;
