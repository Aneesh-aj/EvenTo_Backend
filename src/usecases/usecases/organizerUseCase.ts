import { IorganizerRepository } from "../interface/repositoryInterface/organizerRepository";
import { IorganizerUseCase } from "../interface/usecase/organizerUseCase";
import { Ihashpassword } from "../interface/service/hashPassword";
import { allDetailsById, approvalChecking, createOrganizers, login, signup, uploadBackground, uploadProfile } from './organizer/index'
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IsentEmail } from "../interface/service/sentEmail";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { Next } from "../../framework/types/serverPackageTypes";
import { catchError } from "../middleares/catchError";
import { verifyOtp } from "./organizer/verifyOtp";
import { Iorganizer, IorganizerAndAddress } from "../../entities/organizer";
import { IToken, Ijwt } from "../interface/service/jwt";
import { NextFunction } from "express";
import { resentOpt } from "./otp/otp";

export class OrganizerUseCase implements IorganizerUseCase {
  

    constructor(
       private organizerRepository: IorganizerRepository,
       private hashpassword: Ihashpassword,
       private otpGenerate: IotpGenerate,
       private otpRepository: IotpRepository,
       private sentEmail: IsentEmail,
       private jwt : Ijwt,
    ) {
    }

    async signupOrganzier(email: string,name:string,next:Next): Promise<boolean | void> {
        try {
          const  result = await signup(this.otpGenerate, this.otpRepository, name,email, this.sentEmail,next)
          console.log(" the result",result)
          return result
        } catch (error) {
            catchError(error,next)
        }
    }

    async createOrganizer({ name, email, password, country, state, city, pincode, ownerId, phoneNumber, companyLicense, companyInsurance, bankPassbook, building, otp }: { name: string; email: string; password: string; country: string; state: string; city: string; pincode: number; ownerId: any; phoneNumber: string; companyLicense: any; companyInsurance: any; bankPassbook: any; building: string; otp: string }, next: Next): Promise<Iorganizer | void> {
        try {
            console.log('here at the usecase and email', email, "and ", name)
            const result = await createOrganizers(
                this.organizerRepository,
                this.hashpassword,
                name,
                email,
                password,
                ownerId,
                phoneNumber,
                companyLicense,
                companyInsurance,
                bankPassbook,
                building,
                country,
                state,
                city,
                pincode,
                otp,
                this.otpRepository,
                next
            )
            console.log('the result')
            return result
        } catch (error) {
            catchError(error,next)
        }
    }


    async  verifyOtp(email: string, otp: string, next: Next): Promise<boolean | void> {
        try{
             const result = await verifyOtp(
                this.otpRepository,
                email,
                otp,
                next
             )
             console.log("the reslut",result)
             return result
        }catch(error){
            catchError(error,next)
        }
    }

    async isApproved(id: string, next: Next): Promise<boolean> {
        const  result = await approvalChecking(id,this.organizerRepository)
        return result
    }


    async  login(email: string, password: string, next: Next): Promise<{organizer:Iorganizer,tokens:IToken} | void> {
        try{
            const result = await login(email,password,this.organizerRepository,this.hashpassword,this.jwt,next)
        return result
        }catch(error:any){
            console.log(error)
            console.log("inside the usecase",error)
            console.error(error)
        }
    }

    async  uploedImage(id:string ,url: string, next: Next): Promise<string | null> {
            console.log("in the usecase")
            return await uploadBackground(id,url,this.organizerRepository)
    }

    async  allDetailsById(id: string, next: Next): Promise<IorganizerAndAddress | undefined> {
         try{
            console.log("entering")
            const result =  await allDetailsById(id,this.organizerRepository)
            console.log("usecase result")
            return result ? result: undefined
         }catch(error){
            catchError(error,next)
         }
    }
    
    async  uploadProfile(id: string, url: string, next: Next): Promise<string | null> {
        return await uploadProfile(id,url,this.organizerRepository)

    }
    async resentOtp(email: string, next: NextFunction): Promise<void> {
        try{
            const otp = await resentOpt(this.otpGenerate,this.sentEmail,this.otpRepository,email)
     }catch(error){
          catchError(error,next)
     }   
    }

}