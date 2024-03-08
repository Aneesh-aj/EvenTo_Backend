import { Iuser } from "../../../entities/user";
import { IjsonResponse } from "./jsonResponse"; 
export interface IcloudSession{
     createUserSession(id:string,user:Iuser): Promise <string>
     clearUserSession(id:string):Promise <number>
     getUser(id:string) : Promise <string| IjsonResponse>
}