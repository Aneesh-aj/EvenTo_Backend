import { Iotp } from "../../../entities/otp";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IsentEmail } from "../../interface/service/sentEmail";

export const createOtp = async (otpRepository: IotpRepository,IOtp: Iotp,email:string,otp:string): Promise <Iotp>=>{
       const result = await otpRepository.createOtp(email,otp) 
       return result
}

export const resentOpt = async (otpGenerate:IotpGenerate,sentEmail:IsentEmail, OtpRepository:IotpRepository,email:string):Promise < void> =>{
       try{
              const otp = await otpGenerate.createOtp()
       const resentOpt = await OtpRepository.resendOtp(email,otp)
       const senting  = await sentEmail.sentEmailVerification("user",email,otp)
       }catch(error){
              throw error
       }
}