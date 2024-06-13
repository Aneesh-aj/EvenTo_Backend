import { server } from "./framework/service/socketIo";
// import { app } from "./framework/webServer/config/app";
import conncetDb from "./framework/webServer/config/db";





server.listen(3000,()=>{
    console.log("portrunning on : http://localhost:3000")
    conncetDb()
})