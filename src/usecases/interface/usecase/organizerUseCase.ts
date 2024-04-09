import { Iorganizer } from "../../../entities/organizer";
import { Next , Res, Req } from "../../../framework/types/serverPackageTypes";


export  interface IorganizerUseCase{
    createOrganizer({name,email,password,country,state,city,pincode,ownerId,phoneNumber,companyLicense,companyInsurance,bankPassbook,building,otp}
         : {name:string, email : string, password: string,country:string,state:string, city: string, pincode:number, ownerId: any,phoneNumber:string, companyLicense:any, companyInsurance:any,bankPassbook: any,building : string,otp:string}, next : Next) : Promise < Iorganizer | void >

    signupOrganzier(email:string,name:string,next:Next):Promise <boolean | void>  
    verifyOtp(email:string,otp:string,next:Next):Promise<boolean | void> 
}