import { IorganizerRepository } from "../interface/repositoryInterface/organizerRepository";
import { IorganizerUseCase } from "../interface/usecase/organizerUseCase";
import { Ihashpassword } from "../interface/service/hashPassword";
import { createOrganizers, signup } from './organizer/index'
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IsentEmail } from "../interface/service/sentEmail";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { Next } from "../../framework/types/serverPackageTypes";
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

    async signupOrganzier(email: string): Promise<void | string> {

        try {
            console.log("fron use case ", email)
            const result = await signup(this.otpGenerate, this.otpRepository, email, this.sentEmail)
            console.log("afters the orgnaizer usecase")
            return "hello"
        } catch (error) {
            throw error
        }
    }

    async createOrganizer({ name, email, password, country, state, city, pincode, ownerId, phoneNumber, companyLicense, companyInsurance, bankPassbook, building, otp }: { name: string; email: string; password: string; country: string; state: string; city: string; pincode: number; ownerId: any; phoneNumber: string; companyLicense: any; companyInsurance: any; bankPassbook: any; building: string; otp: string }, next: Next): Promise<void | String> {
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
                this.otpRepository
            )
        } catch (error) {
            console.log(error)
        }
    }





}