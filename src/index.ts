import { app } from "./frameWork/webServer/config/app";
import conncetDb from "./frameWork/webServer/config/db";





app.listen(3000,()=>{
    console.log("portrunning on : http://localhost:3000")
    conncetDb()
})