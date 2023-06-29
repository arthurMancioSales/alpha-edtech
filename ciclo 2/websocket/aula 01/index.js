// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const websocketController = require("./src/websocketController")

const app = express();

app.use("/", express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", websocketController.onConnect)

server.listen(8000, () => {
  console.log("Servidor ouvindo em http://localhost:8000");
});
