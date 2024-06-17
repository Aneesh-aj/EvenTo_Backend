import { server } from "./framework/service/socketIo";
import conncetDb from "./framework/webServer/config/db";


server.listen(3000,()=>{
    console.log("portrunning on : http://localhost:3000")
    conncetDb()
})