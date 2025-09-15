import { NextRequest } from "next/server";
import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export const GET = async (req: NextRequest) => {
  const res = new Response();

  if (!(res as any).socket?.server.io) {
    console.log("Setting up Socket.IO server...");

    const io = new Server((res as any).socket.server);

    // Rooms for WebRTC
    const rooms: Record<string, string[]> = {};
    const patientQueue: Patient[] = [];

    interface Patient {
      id: number;
      name: string;
      status: string;
    }

    io.on("connection", (socket: Socket) => {
      console.log("A user connected:", socket.id);

      // ----- Real-time queue -----
      socket.on("new-patient", (patient: Patient) => {
        patientQueue.push(patient);
        io.emit("queue-update", patientQueue);
      });

      socket.on("start-consultation", (patientId: number) => {
        const index = patientQueue.findIndex((p) => p.id === patientId);
        if (index >= 0) patientQueue[index].status = "In Consultation";
        io.emit("queue-update", patientQueue);

        const roomId = uuidv4();
        io.emit("consultation-started", { patientId, roomId });
      });

      // ----- WebRTC signaling -----
      socket.on("join-room", (data: { roomId: string }) => {
        const { roomId } = data;
        if (!rooms[roomId]) rooms[roomId] = [];
        rooms[roomId].push(socket.id);

        rooms[roomId].forEach((userId) => {
          if (userId !== socket.id) {
            socket.to(userId).emit("user-joined", { signal: null, callerId: socket.id });
          }
        });
      });

      socket.on("return-signal", (data: { signal: any; to: string }) => {
        const { signal, to } = data;
        socket.to(to).emit("receiving-returned-signal", { signal, id: socket.id });
      });

      // ----- Disconnect -----
      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        for (const roomId in rooms) {
          rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
          if (rooms[roomId].length === 0) delete rooms[roomId];
        }
      });
    });

    (res as any).socket.server.io = io;
  }

  return res;
};
