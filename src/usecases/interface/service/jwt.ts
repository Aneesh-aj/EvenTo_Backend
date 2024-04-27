import { Iuser } from "../../../entities/user";
import { Iorganizer } from "../../../entities/organizer";
import { Req } from "../../../framework/types/serverPackageTypes";
import  Jwt  from "jsonwebtoken";


export interface IToken{
    accessToken:string,
    refreshToken:string
}

export interface Ijwt{
    createVerificationJWT(payload:Iuser): Promise <string>
    createAccessAndRefreshToken(id: string): Promise<IToken>
    verifyJwt(token:string): Promise <void>
    forgotPasswordToken(userId:string, email:string): Promise <string>


    
}