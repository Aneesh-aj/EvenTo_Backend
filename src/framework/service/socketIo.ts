import { Server } from 'socket.io';
import { app } from "../webServer/config/app";
import http from 'http';



export const server = http.createServer(app);
export const io = new Server(server,{cors:{origin:"*"}});


io.on('connection', (socket) => {
    console.log('A user connected');

  socket.on('selectSeat', (data: any) => {
        console.log("caLLL===--------")
        io.emit("seatSelected",{status:true})
    });

   

    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

