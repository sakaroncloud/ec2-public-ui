const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

/**
 * NOTE: This backend is intended to run on a PRIVATE EC2 instance (Private Subnet).
 * It is not directly accessible from the public internet.
 * The React frontend (Public Subnet) will communicate with this API via a proxy.
 */

app.use(cors());
app.use(express.json());

// Start time for uptime calculation
const startTime = Date.now();

// /data -> show message
app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from the Private Subnet!",
    timestamp: new Date().toISOString(),
    location: "Private EC2 Instance",
  });
});

// /status -> show server health and uptime
app.get("/api/status", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  res.json({
    status: "Healthy",
    uptime: `${uptimeSeconds}s`,
    memoryUsage: process.memoryUsage().heapUsed,
    nodeVersion: process.version,
  });
});

// /echo -> POST input from user and show response
app.post("/api/echo", (req, res) => {
  const { input } = req.body;
  res.json({
    received: input,
    serverMessage: `Server received: "${input}"`,
    echoTimestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`--------------------------------------------------`);
  console.log(`Private Node.js API running on port ${PORT}`);
  console.log(`Simulated Subnet: Private`);
  console.log(`Endpoints: /api/data, /api/status, /api/echo`);
  console.log(`--------------------------------------------------`);
});
