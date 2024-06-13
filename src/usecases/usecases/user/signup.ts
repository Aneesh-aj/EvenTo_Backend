import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IToken, Ijwt } from "../../interface/service/jwt";
import { Iuser } from "../../../entities/user";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { IsentEmail } from "../../interface/service/sentEmail";
import { Next } from "../../../framework/types/serverPackageTypes";
import ErrorHandler from "../../middleares/errorHandler";
import { Ihashpassword } from "../../interface/service/hashPassword";
import { catchError } from "../../middleares/catchError";

export const userSignup = async (jwt:Ijwt ,otpRepository:IotpRepository,userRepoistory:IuserRepository, otpGenerate:IotpGenerate,hashPassword:Ihashpassword, user:Iuser,sentEmail:IsentEmail,next :Next): Promise <string | void> =>{
     
     try{
        const isUserExist = await userRepoistory.findbyEmail(user.email)
        if(isUserExist){
           return next(new ErrorHandler(400,"user already exist"))
        }
       
        const isUserOnOtp = await otpRepository.findOtp(user.email)
        if(isUserOnOtp){
          
           await sentEmail.sentEmailVerification(user.name,user.email,isUserOnOtp.otp as string)  
           const hashPasswords = await hashPassword.createHash(user.password as string)
           user.password = hashPasswords
           const jwtToken = await jwt.createVerificationJWT({name: user.name,email:user.email,password:user.password})
           return jwtToken
        }else{
           const otp = await otpGenerate.createOtp()
           await otpRepository.createOtp(user.email,otp)
           await sentEmail.sentEmailVerification(user.name,user.email,otp)
           const hashPasswords = await hashPassword.createHash(user.password as string)
           user.password = hashPasswords

           const token = await jwt.createVerificationJWT({name:user.name,email:user.email,password:user.password})
           return token

        }
     }catch(error){
         catchError(error,next)
     }
     
}