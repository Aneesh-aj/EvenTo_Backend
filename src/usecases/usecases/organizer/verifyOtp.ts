import { Next } from "../../../framework/types/serverPackageTypes"
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository"
import ErrorHandler from "../../middleares/errorHandler"



export const verifyOtp = async(otpRepository:IotpRepository,email:string,otp:string,next:Next)=>{
    try{
        console.log(" email from the usesace",email)
        const isOtp = await otpRepository.findOtp(email)
        console.log(" isotp",isOtp ," and ", otp)
        if(!isOtp) return next(new ErrorHandler(400,"No otp found "))
        if(isOtp.otp !== otp){
            return {success:false,message:"otp missmatched"}
        }else{
            return {success:true,message:"otp validated"}
        }
        
    }catch(error){
        throw error
    }
}