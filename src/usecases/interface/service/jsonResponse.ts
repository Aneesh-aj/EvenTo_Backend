import { Iuser } from "../../../entities/user";

export interface IjsonResponse{
    user?:Iuser,
    status:number,
    success:boolean,
    message:string
}