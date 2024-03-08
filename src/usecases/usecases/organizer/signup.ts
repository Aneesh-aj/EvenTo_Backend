import { IotpRepository } from "../../interface/repositoryInterface/otpRepository"
import { IotpGenerate } from "../../interface/service/otpGenerate"
import { IsentEmail } from "../../interface/service/sentEmail"



export const signup = async(otpGenerator:IotpGenerate,otpRepository:IotpRepository,email:string,sentEmail:IsentEmail)=>{
     
     let otp = await  otpGenerator.createOtp()
     console.log(" created otp in usedcase",otp)
     let updating = await otpRepository.createOtp(email,otp)

     let sending = await sentEmail.sentEmailVerification(email,otp)
     console.log(sending)

    return "hello"
}