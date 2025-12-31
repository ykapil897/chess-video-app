<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Chess + Video Call Web App</title>
</head>
<body>

<h1>♟️ Chess + Video Call Web Application</h1>

<p>
A real-time multiplayer chess web application with integrated peer-to-peer
video and audio calling. The system is fully server-authoritative for game
logic and uses modern web technologies for real-time synchronization.
</p>

<hr />

<h2>🌐 Live URLs</h2>

<ul>
  <li>
    <strong>Frontend (Vercel):</strong><br />
    <a href="https://chess-video-app-bvq9.vercel.app/" target="_blank">
      https://chess-video-app-bvq9.vercel.app
    </a>
  </li>
  <li>
    <strong>Backend (Render):</strong><br />
    <a href="https://YOUR_BACKEND_URL.onrender.com/health" target="_blank">
      https://YOUR_BACKEND_URL.onrender.com/health
    </a>
  </li>
</ul>

<p>
⚠️ <em>Note:</em> The Render backend may take a few seconds to wake up if it has
been idle (free tier behavior).
</p>

<hr />

<h2>🧩 What This Project Does</h2>

<ul>
  <li>Rule-correct chess enforced on the server</li>
  <li>Real-time multiplayer gameplay using Socket.IO</li>
  <li>Turn-based move enforcement (White / Black)</li>
  <li>Automatic spectator mode</li>
  <li>Peer-to-peer video & audio calling using WebRTC</li>
  <li>Clean UI with board orientation based on player color</li>
  <li>Move history and game status display</li>
</ul>

<hr />

<h2>👥 Player Roles</h2>

<h3>🎮 White & Black Players</h3>
<ul>
  <li>The first user to join a game becomes <strong>White</strong></li>
  <li>The second user becomes <strong>Black</strong></li>
  <li>Only players can:
    <ul>
      <li>Make moves (server-validated)</li>
      <li>Start video/audio call</li>
      <li>Toggle microphone and camera</li>
    </ul>
  </li>
</ul>

<h3>👀 Spectator Mode</h3>
<ul>
  <li>If two players are already playing, any additional user joins as a <strong>Spectator</strong></li>
  <li>Spectators can:
    <ul>
      <li>Watch the game live</li>
      <li>See all moves in real time</li>
      <li>View game status (turn, checkmate, draw)</li>
    </ul>
  </li>
  <li>Spectators <strong>cannot</strong>:
    <ul>
      <li>Make moves</li>
      <li>Start or view video/audio streams</li>
      <li>See any media controls</li>
    </ul>
  </li>
</ul>

<p>
This behavior is intentional and mirrors real-world multiplayer platforms.
</p>

<hr />

<h2>📹 Video & Audio Calling</h2>

<ul>
  <li>Implemented using <strong>WebRTC (peer-to-peer)</strong></li>
  <li>Socket.IO is used <em>only</em> for signaling (offer/answer/ICE)</li>
  <li>No media server, no TURN server (STUN-only)</li>
  <li>White initiates the call</li>
  <li>Black joins automatically when connected</li>
</ul>

<p>
⚠️ Due to NAT or network restrictions, video may not work on some networks.
This is expected without a TURN server.
</p>

<hr />

<h2>🏗️ Architecture</h2>

<pre>
Browser (Player A) ── WebRTC ── Browser (Player B)
       │                              │
       └──────── Socket.IO ──────────┘
                    │
                Backend (Render)
</pre>

<ul>
  <li>Frontend: React + Vite (Vercel)</li>
  <li>Backend: Node.js + Socket.IO + chess.js (Render)</li>
  <li>Game state stored in memory (per game)</li>
</ul>

<hr />

<h2>🐳 Docker Support (Local Development)</h2>

<p>
The project is fully Dockerized for local development and reproducibility.
</p>

<h3>Run Locally with Docker</h3>

<pre>
docker compose build
docker compose up
</pre>

<ul>
  <li>Frontend: <code>http://localhost:5173</code></li>
  <li>Backend: <code>http://localhost:3001</code></li>
</ul>

<p>
⚠️ Do not mix local Docker backend with deployed frontend (Vercel).
Use one environment at a time.
</p>

<hr />

<h2>🚀 Deployment</h2>

<h3>Backend</h3>
<ul>
  <li>Platform: Render</li>
  <li>Runtime: Node.js</li>
  <li>Build: <code>npm install && npm run build</code></li>
  <li>Start: <code>node dist/server.js</code></li>
</ul>

<h3>Frontend</h3>
<ul>
  <li>Platform: Vercel</li>
  <li>Framework: Vite</li>
  <li>Build: <code>npm run build</code></li>
  <li>Output: <code>dist</code></li>
</ul>

<h3>Required Environment Variable (Vercel)</h3>

<pre>
VITE_BACKEND_URL=https://YOUR_BACKEND_URL.onrender.com
</pre>

<hr />

<h2>🧪 How to Test</h2>

<ol>
  <li>Open the app in a normal browser window (Player 1)</li>
  <li>Open the app in an incognito or different browser (Player 2)</li>
  <li>Player 1 becomes White, Player 2 becomes Black</li>
  <li>White starts the video call</li>
  <li>Moves sync instantly between both players</li>
  <li>Open a third window → joins as Spectator</li>
</ol>

<hr />

<h2>✅ Features Summary</h2>

<ul>
  <li>✔ Real-time multiplayer chess</li>
  <li>✔ Server-authoritative rules</li>
  <li>✔ Turn enforcement</li>
  <li>✔ Spectator support</li>
  <li>✔ WebRTC video & audio</li>
  <li>✔ Dockerized</li>
  <li>✔ Deployed on free cloud services</li>
</ul>

<hr />

<h2>📌 Notes</h2>

<ul>
  <li>This project uses only free-tier services</li>
  <li>Cold starts may occur on Render</li>
  <li>Video quality depends on peer network conditions</li>
</ul>

<hr />

<h2>👤 Author</h2>

<p>
Built as a full-stack real-time systems project demonstrating
WebSockets, WebRTC, distributed state management, and modern frontend tooling.
</p>

</body>
</html>
