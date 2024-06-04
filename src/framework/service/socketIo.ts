import { Server } from 'socket.io';
import { app } from "../webServer/config/app";
import http from 'http';
import { Next, Req, Res } from "../../framework/types/serverPackageTypes";

import { userController } from '../webServer/routes/injections/Injection';




export const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('selectSeat', (data: any) => {
        console.log("caLLL===--------")
        io.emit("seatSelected", { status: true })
    });



    socket.on('joinRoom', ({ senderId, receiverId }) => {
        const roomName = [senderId, receiverId].sort().join('-');
        socket.join(roomName);
        console.log(`User joined room: ${roomName}`);
    });

    socket.on("sendData", (data) => {
        const { senderId, receiverId, message } = data;
        const roomName = [senderId, receiverId].sort().join('-');
        io.to(roomName).emit("resiveData", data);
    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

