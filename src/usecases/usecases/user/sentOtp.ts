import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IsentEmail } from "../../interface/service/sentEmail";

export const sentOtp = async (email:string,name:string,otpGenerate:IotpGenerate,otpRepository:IotpRepository,sentEmail:IsentEmail,userRepoistory:IuserRepository):Promise<{success:boolean,message:string} | undefined>=>{
    try{

        const user = await userRepoistory.findbyEmail(email)
        if(!user)return {success:false,message:"No user found"}
        const otp = await otpGenerate.createOtp()
        const otpAdded = await otpRepository.createOtp(email,otp)
       
            const senToemail = await sentEmail.sentEmailVerification(name,email,otp)
            return {success:true,message:"Otp sented to your email"}
        

    }catch(error){
         throw error
    }
}