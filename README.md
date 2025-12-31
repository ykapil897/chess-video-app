<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Chess + Video Call Web App</title>
</head>
<body>

<h1>♟️ Chess + Video Call Web Application</h1>

<p>
A real-time multiplayer chess application with integrated peer-to-peer
video and audio calling. The system enforces all chess rules on the server
and supports players and spectators in real time.
</p>

<hr />

<h2>🌐 Live URLs</h2>

<ul>
  <li>
    <strong>Frontend (Vercel):</strong><br />
    <a href="https://chess-video-app.vercel.app/" target="_blank">
      https://chess-video-app.vercel.app/
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
⚠️ <em>Note:</em> The backend is deployed on Render (free tier) and may take
some time to wake up after inactivity.
</p>

<hr />

<h2>🧩 Features</h2>

<ul>
  <li>Server-authoritative chess rules (no illegal moves)</li>
  <li>Real-time multiplayer using Socket.IO</li>
  <li>White / Black role assignment</li>
  <li>Spectator mode when two players are already playing</li>
  <li>Peer-to-peer video & audio using WebRTC</li>
  <li>Mic and camera toggle controls</li>
  <li>Board orientation based on player color</li>
  <li>Move history and clear game status (playing / checkmate / draw)</li>
</ul>

<hr />

<h2>👥 Roles & Behavior</h2>

<h3>🎮 Players (White & Black)</h3>
<ul>
  <li>First user becomes <strong>White</strong></li>
  <li>Second user becomes <strong>Black</strong></li>
  <li>Only players can:
    <ul>
      <li>Make moves</li>
      <li>Start video/audio</li>
      <li>Toggle mic and camera</li>
    </ul>
  </li>
</ul>

<h3>👀 Spectator</h3>
<ul>
  <li>If two players are already playing, any additional user joins as a spectator</li>
  <li>Spectators can:
    <ul>
      <li>Watch the game live</li>
      <li>See all moves and game status</li>
    </ul>
  </li>
  <li>Spectators cannot:
    <ul>
      <li>Make moves</li>
      <li>Start or view video/audio</li>
      <li>See media controls</li>
    </ul>
  </li>
</ul>

<hr />

<h2>📹 Video & Audio</h2>

<ul>
  <li>Implemented using WebRTC (peer-to-peer)</li>
  <li>Socket.IO used only for signaling</li>
  <li>No media server, no TURN server (STUN-only)</li>
  <li>White initiates the call</li>
  <li>Black joins automatically</li>
</ul>

<p>
⚠️ Video may not work on some restrictive networks due to the absence of a TURN server.
</p>

<hr />

<h2>🐳 Running Locally with Docker</h2>

<p>
The project is fully Dockerized for local development.
</p>

<h3>📁 Project Location</h3>

<pre>
versions/v0-phase0/
</pre>

<h3>▶️ Docker Commands</h3>

<pre>
# Build containers
docker compose build

# Start frontend + backend
docker compose up
</pre>

<h3>🔗 Local URLs</h3>

<ul>
  <li>Frontend: <code>http://localhost:5173</code></li>
  <li>Backend: <code>http://localhost:3001</code></li>
  <li>Health check: <code>http://localhost:3001/health</code></li>
</ul>

<h3>🛑 Stop Containers</h3>

<pre>
Ctrl + C
docker compose down
</pre>

<p>
⚠️ When running locally, do <strong>not</strong> open the Vercel URL.
</p>

<hr />

<h2>🔄 Switching Between Local & Production</h2>

<h3>Local Development</h3>

<ul>
  <li>Use Docker or local Node backend</li>
  <li>Socket connects to:
    <pre>http://localhost:3001</pre>
  </li>
</ul>

<h3>Production Deployment</h3>

<ul>
  <li>Frontend hosted on Vercel</li>
  <li>Backend hosted on Render</li>
  <li>Socket connects using environment variable:</li>
</ul>

<pre>
VITE_BACKEND_URL=https://YOUR_BACKEND_URL.onrender.com
</pre>

<p>
⚠️ Never mix environments:
</p>

<ul>
  <li>❌ Local frontend + Render backend</li>
  <li>❌ Vercel frontend + local backend</li>
</ul>

<p>
Always use:
</p>

<ul>
  <li>Local frontend + local backend, OR</li>
  <li>Vercel frontend + Render backend</li>
</ul>

<hr />

<h2>🚀 Deployment</h2>

<h3>Backend (Render)</h3>
<ul>
  <li>Runtime: Node.js</li>
  <li>Build command:
    <pre>npm install && npm run build</pre>
  </li>
  <li>Start command:
    <pre>node dist/server.js</pre>
  </li>
</ul>

<h3>Frontend (Vercel)</h3>
<ul>
  <li>Framework: Vite</li>
  <li>Build command:
    <pre>npm run build</pre>
  </li>
  <li>Output directory:
    <pre>dist</pre>
  </li>
</ul>

<hr />

<h2>🧪 How to Test</h2>

<ol>
  <li>Open the app in a normal browser window (Player 1)</li>
  <li>Open the app in an incognito or different browser (Player 2)</li>
  <li>Player 1 becomes White, Player 2 becomes Black</li>
  <li>White starts the video call</li>
  <li>Moves sync instantly</li>
  <li>Open a third window → joins as Spectator</li>
</ol>

<hr />

<h2>📌 Notes</h2>

<ul>
  <li>Render free tier may sleep after inactivity</li>
  <li>First request may take time due to cold start</li>
  <li>Vercel frontend never sleeps</li>
</ul>

<hr />

<h2>👤 Author</h2>

<p>
This project demonstrates real-time systems design using WebSockets,
WebRTC, Docker, and modern frontend tooling.
</p>

</body>
</html>
