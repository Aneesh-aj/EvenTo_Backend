import { Iuser } from "../../entities/user"; 
import { IjsonResponse } from "../../usecases/interface/service/jsonResponse";
import { redis } from "../../index";
import { IcloudSession } from "../../usecases/interface/service/cloudSession";

export class CloudSession implements IcloudSession{
    async  createUserSession(id: string, user: Iuser): Promise<string> {
        const result = await redis.set(id, JSON.stringify(user))
        return result
    }

    async  clearUserSession(id: string): Promise<number> {
        const result = await redis.del(id)
        return result
    }

    async  getUser(id: string): Promise<string | IjsonResponse> {
        const user = await redis.get(id)
        if(!user){
            return {status:400, success: false, message:"session has expired"}
        }else{
            return user
        }
    }
}

