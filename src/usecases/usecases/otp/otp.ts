import { Iotp } from "../../../entities/otp";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";

export const createOtp = async (otpRepository: IotpRepository,IOtp: Iotp,email:string,otp:string): Promise <Iotp>=>{
       const result = await otpRepository.createOtp(email,otp) 
       return result
}