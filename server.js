// // server.js
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// const rooms = {}; // roomId -> [socketIds]

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("join-room", ({ roomId, userType }) => {
//     if (!rooms[roomId]) rooms[roomId] = [];
//     rooms[roomId].push(socket.id);

//     const otherUsers = rooms[roomId].filter((id) => id !== socket.id);
//     socket.emit("all-users", otherUsers);

//     socket.on("sending-signal", ({ userToSignal, signal }) => {
//       io.to(userToSignal).emit("user-joined", { signal, callerId: socket.id });
//     });

//     socket.on("returning-signal", ({ signal, callerId }) => {
//       io.to(callerId).emit("receiving-returned-signal", { signal, id: socket.id });
//     });

//     socket.on("disconnect", () => {
//       rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
//       console.log("Client disconnected:", socket.id);
//     });
//   });
// });

// server.listen(5000, () => console.log("Server running on http://localhost:5000"));
