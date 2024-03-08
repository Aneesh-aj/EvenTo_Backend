import { redisDb } from "./framework/database/redis/config";
import { app } from "./framework/webServer/config/app";
import conncetDb from "./framework/webServer/config/db";

export const redis = redisDb()




app.listen(3000,()=>{
    console.log("portrunning on : http://localhost:3000")
    conncetDb()
})