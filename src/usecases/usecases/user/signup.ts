import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Iuserjwt } from "../../interface/service/jwt";
import { Iuser } from "../../../entities/user";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { IsentEmail } from "../../interface/service/sentEmail";

export const userSignup = async (otpRepository:IotpRepository, otpGenerate:IotpGenerate,  email:string,sentEmail:IsentEmail): Promise <string | void> =>{

     console.log("before")
     const otp = await otpGenerate.createOtp()
     console.log("coming here")
     console.log("otp fist", otp)

     const repoOtp = await otpRepository.createOtp(email,otp)
     
     const sentTomail = await sentEmail.sentEmailVerification(email,otp)
     

      
     return

    // const creating = await userRepository.createUser({name,email,password})
      
    // console.log("in the creatuser ",creating)
    
    // const token = await jwt.createVerificationJWT({name,email,password})
    // console.log("hte token", token)


     
}