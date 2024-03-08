import { Iuser } from "../../../entities/user";


export interface Response{
    status:number;
    success:boolean;
    message?:string;
    user?:Iuser;
    token?:string
}