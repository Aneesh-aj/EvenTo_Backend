import { Server, Socket } from 'socket.io';
import { allowedOrigins, app } from "../webServer/config/app";
import http from 'http';
import { Next, Req, Res } from "../../framework/types/serverPackageTypes";

export const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

io.on('connection', (socket: Socket) => { 
    console.log('A user connected');

    socket.on('selectSeat', () => {
        io.emit("seatSelected", { status: true });
    });

    socket.on('joinRoom', ({ senderId, receiverId }: { senderId: string, receiverId: string }) => {
        const roomName = [senderId, receiverId].sort().join('-');
        socket.join(roomName);
        console.log(`User joined room: ${roomName}`);
    });

    socket.on("sendData", (data: { senderId: string, receiverId: string, message: string }) => {  // Explicitly typing data
        const { senderId, receiverId, message } = data;
        const roomName = [senderId, receiverId].sort().join('-');
        io.to(roomName).emit("resiveData", data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
