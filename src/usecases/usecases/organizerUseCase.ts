import { IorganizerRepository } from "../interface/repositoryInterface/organizerRepository";
import { IorganizerUseCase } from "../interface/usecase/organizerUseCase";
import { Ihashpassword } from "../interface/service/hashPassword";
import { createOrganizers, signup } from './organizer/index'
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IsentEmail } from "../interface/service/sentEmail";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { Next } from "../../framework/types/serverPackageTypes";
import { catchError } from "../middleares/catchError";
import { verifyOtp } from "./organizer/verifyOtp";
import { Iorganizer } from "../../entities/organizer";
// import { Ijwt } from "../interface/service/jwt";

export class OrganizerUseCase implements IorganizerUseCase {
    private readonly organizerRepository: IorganizerRepository
    private readonly hashpassword: Ihashpassword
    // private readonly jwt : Ijwt
    private readonly otpGenerate: IotpGenerate
    private readonly otpRepository: IotpRepository
    private readonly sentEmail: IsentEmail

    constructor(organizerRepository: IorganizerRepository,
        hashpassword: Ihashpassword,
        // jwt : Ijwt,
        otpGenerate: IotpGenerate,
        otpRepository: IotpRepository,
        sentEmail: IsentEmail
    ) {
        this.organizerRepository = organizerRepository
        this.hashpassword = hashpassword
        // this.jwt = jwt
        this.otpGenerate = otpGenerate
        this.otpRepository = otpRepository
        this.sentEmail = sentEmail
    }

    async signupOrganzier(email: string,name:string,next:Next): Promise<boolean | void> {
        try {
          let result = await signup(this.otpGenerate, this.otpRepository, name,email, this.sentEmail,next)
          console.log(" the result",result)
          return result
        } catch (error) {
            catchError(error,next)
        }
    }

    async createOrganizer({ name, email, password, country, state, city, pincode, ownerId, phoneNumber, companyLicense, companyInsurance, bankPassbook, building, otp }: { name: string; email: string; password: string; country: string; state: string; city: string; pincode: number; ownerId: any; phoneNumber: string; companyLicense: any; companyInsurance: any; bankPassbook: any; building: string; otp: string }, next: Next): Promise<Iorganizer | void> {
        try {
            console.log('here at the usecase and email', email, "and ", name)
            let result = await createOrganizers(
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





}