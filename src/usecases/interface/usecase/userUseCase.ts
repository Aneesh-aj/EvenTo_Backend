import { Iaddress } from "../../../entities/address";
import { Iuser } from "../../../entities/user";

import { Next,Res,Req } from "../../../framework/types/serverPackageTypes";
import { IToken } from "../service/jwt";

export interface IuserUseCase{
    userSignup( user: Iuser,next : Next) : Promise < string | void >
    login(email:string,password:string,next:Next) : Promise < {user:Iuser, tokens:IToken} | void> 
    createUser(token:string , otp:string, next: Next) : Promise <Iuser| void>
    getUser(id:string,next:Next):Promise<{user:Iuser,address:Iaddress}| {user:Iuser} | undefined>
    editProfile(id:string,formData:any,next:Next):Promise <{user:Iuser,address:Iaddress} | Iuser | undefined>
    addProfilePicture(id:string,image:string,next:Next):Promise<boolean | undefined>
    resentOtp(email:string,next:Next):Promise<void>
}