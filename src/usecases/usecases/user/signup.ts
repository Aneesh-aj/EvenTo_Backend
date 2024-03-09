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
import { SentinelIterator } from "ioredis";

export const userSignup = async (jwt:Ijwt ,otpRepository:IotpRepository,userRepoistory:IuserRepository, otpGenerate:IotpGenerate,hashPassword:Ihashpassword, user:Iuser,sentEmail:IsentEmail,next :Next): Promise <string | void> =>{
     
     try{
        const isUserExist = await userRepoistory.findbyEmail(user.email)
        if(isUserExist){
           return next(new ErrorHandler(400,"user already exist"))
        }

        console.log("after current user")
       
        const isUserOnOtp = await otpRepository.findOtp(user.email)
        if(isUserOnOtp){
          
           await sentEmail.sentEmailVerification(user.name,user.email,isUserOnOtp.otp as string)
   
           const hashPasswords = await hashPassword.createHash(user.password as string)
           
           user.password = hashPasswords
   
           const jwtToken = await jwt.createVerificationJWT({name: user.name,email:user.email,password:user.password})
           console.log(" JwtRokekeks", jwtToken)
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
      console.log("its here")
         catchError(error,next)
     }
    //  console.log("before")
    //  const otp = await otpGenerate.createOtp()
    //  console.log("coming here")
    //  console.log("otp fist", otp)

    //  const repoOtp = await otpRepository.createOtp(email,otp)
     
    //  const sentTomail = await sentEmail.sentEmailVerification(email,otp)
     

      
    //  return

    // const creating = await userRepository.createUser({name,email,password})
      
    // console.log("in the creatuser ",creating)
    
    // const token = await jwt.createVerificationJWT({name,email,password})
    // console.log("hte token", token)


     
}