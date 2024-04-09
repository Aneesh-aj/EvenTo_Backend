import { Next } from "../../../framework/types/serverPackageTypes"
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository"
import ErrorHandler from "../../middleares/errorHandler"



export const verifyOtp = async(otpRepository:IotpRepository,email:string,otp:string,next:Next)=>{
    try{
        const isOtp = await otpRepository.findOtp(email)
        console.log(" isotp",isOtp)
        if(!isOtp) return next(new ErrorHandler(400,"No otp found "))
        if(isOtp.otp !== otp){
            return next(new ErrorHandler(400,"otp mismatched"))
        }else{
            return true
        }
        
    }catch(error){
        throw error
    }
}