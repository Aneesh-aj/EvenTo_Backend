import { Iotp } from "../../../../entities/otp";
import { IotpRepository } from "../../../../usecases/interface/repositoryInterface/otpRepository";
import otpModel from "../model/otp";

export class OtpRepository implements IotpRepository{
      constructor(){}

      async createOtp(email:string,otp:string): Promise<Iotp> {
         try{
          console.log("before calling the otp crating")
          const  result = await otpModel.create({email,otp})
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

     async findOtp(email: string): Promise<any | null> {
         try{
          console.log("finding the otp ",email)
          const result = await otpModel.find({email:email})
          console.log("result",result)
           if(result.length === 0){
             return null
           }
          return result[0]
         }catch(error){
           throw error
         }
      }
    
      async  findAndDeleteUser(email: string, otp: string): Promise< boolean> {
          try{
            console.log(" in the repos",email,otp)
            
            const checking = await otpModel.findOne({email})
            console.log(" chekkicng",checking)
              const result = await otpModel.findOneAndDelete({email})
              console.log("result of the otp repository",result)
              if(result){
                console.log("reuslt and the veri", result.otp,otp,typeof result.otp , typeof otp)
                console.log(result.otp  == otp)
                if(result.otp ==otp){

                  return true
                }else{
                  return false
                }
              }else{
                return false
              }
          }catch(error){
             throw error
          }
      }

      async resendOtp(email:string,otp:string):Promise< any>{
            try{
              
              const checking = await otpModel.updateOne({email:email},{otp:otp},{upsert:true})
              return

            }catch(error){
               throw error
            }
      }
      
      
      
}