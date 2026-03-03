# Hybrid Cloud Gateway: Public Frontend ↔ Private API

This project demonstrates a secure hybrid cloud architecture. It consists of a **React + Vite** frontend (simulated for a Public Subnet) and an **Express.js** backend (simulated for a Private Subnet).

## 🏗️ Architecture Overview

- **Frontend (Public Subnet):** A React application that handles user interaction and communicates with the backend via a reverse proxy.
- **Backend (Private Subnet):** A Node.js API that serves restricted data, provides health status, and echoes communication.
- **The Bridge:** The Vite development server is configured to proxy requests from `/api` to the backend on port `3001`, simulating a VPC/Gateway configuration where the backend isn't directly exposed to the internet.

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- npm

### 2. Setup Backend (Private API)

```bash
cd server
npm install
npm start
```

_The server will run on [http://10.0.1.181:3001](http://10.0.1.181:3001)._

### 3. Setup Frontend (Public UI)

In a new terminal:

```bash
# Return to root directory
npm install
npm run dev
```

_*The UI will run on [http://localhost](http://localhost).* (Port 80)_

## 📡 API Endpoints (Private Network)

| Method | Endpoint      | Description                                      |
| :----- | :------------ | :----------------------------------------------- |
| `GET`  | `/api/data`   | Fetches simulated secure data.                   |
| `GET`  | `/api/status` | Returns server health, uptime, and node version. |
| `POST` | `/api/echo`   | Reflects back the user input.                    |

## 📁 Project Structure

```text
├── server/             # Express.js Backend (Private Subnet)
│   ├── package.json
│   └── server.cjs
├── src/                # React Frontend (Public Subnet)
│   ├── components/     # UI Components (StatusCard, DataSection, etc.)
│   ├── App.tsx         # Main Logic & API Orchestration
│   └── main.tsx
├── vite.config.ts      # Proxy configuration
└── package.json        # Frontend dependencies
```

## 🛠️ Built With

- **Frontend:** React 19, TypeScript, Vite, Vanilla CSS.
- **Backend:** Node.js, Express, CORS.
- **Linting:** ESLint with TypeScript and React rules.

## 📜 License

MIT
