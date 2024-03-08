import { Iuser } from "../../../entities/user";
import { Iorganizer } from "../../../entities/organizer";
import { Req } from "../../../frameWork/types/serverPackageTypes";


export interface IToken{
    accessToken:string,
    refreshToken:string
}

export interface Iuserjwt{
    createVerificationJWT(payload:any): Promise <any>
    createAccessAndRefreshToken(id:string, role:string): Promise <IToken>
    verifyJwt(token:string): Promise <void>
    forgotPasswordToken(userId:string, email:string): Promise <string>
}