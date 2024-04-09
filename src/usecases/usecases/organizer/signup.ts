import { Next } from "../../../framework/types/serverPackageTypes"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository"
import { IotpGenerate } from "../../interface/service/otpGenerate"
import { IsentEmail } from "../../interface/service/sentEmail"
import ErrorHandler from "../../middleares/errorHandler"



export const signup = async (otpGenerator: IotpGenerate, otpRepository: IotpRepository, name: string, email: string, sentEmail: IsentEmail, next: Next):Promise<boolean | void> => {

    try {
        const isOnOtp = await otpRepository.findOtp(email)
        if(isOnOtp){
            await sentEmail.sentEmailVerification(name,email,isOnOtp.otp as string)
            return true
        }else{

            const  otp = await otpGenerator.createOtp()
            await otpRepository.createOtp(email, otp)
            await sentEmail.sentEmailVerification(name, email, otp)
            return true
        }
    } catch (error) {
        console.log("through error",error)
        throw error
    }

}