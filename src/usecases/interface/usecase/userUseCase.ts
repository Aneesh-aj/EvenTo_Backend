import { Iuser } from "../../../entities/user";

import { Next,Res,Req } from "../../../frameWork/types/serverPackageTypes";
import { IToken } from "../service/jwt";

export interface IuserUseCase{
    userSignup( email :string,next : Next) : Promise < string | void >
    login(email:string,password:string,next:Next) : Promise < {
        accessToken: any;Tokens:IToken
} | void> 
    createUser(newUser:Iuser,otp:string, next: Next) : Promise <string | void>
}