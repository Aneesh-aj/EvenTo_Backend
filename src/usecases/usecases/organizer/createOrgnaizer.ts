import { Iorganizer } from "../../../entities/organizer";
import { Next } from "../../../framework/types/serverPackageTypes";
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { Ihashpassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middleares/errorHandler";
// import { Ijwt } from "../../interface/service/jwt";


export const createOrganizers = async (

    OrganizerRepository: IorganizerRepository, hashPassword: Ihashpassword,
    name: string, email: string, password: string, ownerId: string, phoneNumber: string
    , companyLicense: string, companyInsurance: string, bankPassbook: string,
    building: string, country: string, state: string, city: string, pincode: number, otp: string, otpRepository: IotpRepository,next:Next

): Promise<Iorganizer | void> => {
   try{
    console.log("befoer the firebase ")
    console.log("email is", email, " and otp", otp, "name", name)
        const encryptPassword = await hashPassword.createHash(password)
        console.log("pass word hashsed", password, "and name", name)
        const user = await OrganizerRepository.createOrganizer({ name, email, phoneNumber, password:encryptPassword , ownerId, companyLicense, companyInsurance, bankPassbook })
        const userId = user?._id
        if (userId) {
            const address = await OrganizerRepository.createAddress({ country, state, city, pincode, building, userId })
        }
        return user
    
   }catch(error){
        throw error
   }

}

