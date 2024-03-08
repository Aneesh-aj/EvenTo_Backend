import { Iotp } from "../../../entities/otp";
import { IotpRepository } from "../../../usecases/interface/repositoryInterface/otpRepository";
import otpModel from "../model/otp";

export class OtpRepository implements IotpRepository{
      constructor(){}

      async createOtp(email:string,otp:string): Promise<Iotp> {
         try{
          console.log("before calling the otp crating")
          let  result = await otpModel.create({email,otp})
          setTimeout(async () => {
            if (result?._id) {
              await otpModel.findByIdAndDelete(result._id);
            }
          }, 1200000);
          console.log("the otp creating", result)
          return result
         }catch(error){
            throw error
         }
      }

     async findOtp(email: string): Promise<Iotp | null> {
         console.log("finding the otp ",email)
          const result = await otpModel.findOne({email})
          console.log("result")
          return result
      }

      
      
      
}