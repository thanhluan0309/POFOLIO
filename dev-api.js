/**
 * Local dev server for /api routes.
 * Run: node dev-api.js
 * Then npm start in another terminal.
 * CRA proxy (in package.json) forwards /api/* requests here.
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

// Load .env (fallback to .env.example) without dotenv dependency
function loadEnvFile(filename) {
  const envFile = fs.readFileSync(path.join(__dirname, filename), "utf8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (key && val) process.env[key] = val;
  }
}

try {
  loadEnvFile(".env");
  console.log("✓ Loaded .env");
} catch {
  try {
    loadEnvFile(".env.example");
    console.log("✓ Loaded .env.example (no .env found)");
  } catch {
    console.warn("⚠ No .env or .env.example found — set env vars manually");
  }
}

const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
console.log(`✓ AI provider: ${provider}`);

const handler = require("./api/chat");
const PORT = 3002;

// Wrap raw Node response thành Vercel/Express-compatible object
function wrapRes(rawRes) {
  let statusCode = 200;
  const wrapped = {
    setHeader: (k, v) => rawRes.setHeader(k, v),
    status: (code) => {
      statusCode = code;
      return wrapped;
    },
    json: (data) => {
      rawRes.writeHead(statusCode, { "Content-Type": "application/json" });
      rawRes.end(JSON.stringify(data));
    },
    end: (...args) => {
      rawRes.writeHead(statusCode);
      rawRes.end(...args);
    },
  };
  return wrapped;
}

const server = http.createServer((req, res) => {
  if (
    req.url === "/api/chat" &&
    (req.method === "POST" || req.method === "OPTIONS")
  ) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
      } catch {
        req.body = {};
      }
      handler(req, wrapRes(res));
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(PORT, () => {
  console.log(`✓ API dev server → http://localhost:${PORT}`);
  console.log('  Now run "npm start" in another terminal\n');
});
