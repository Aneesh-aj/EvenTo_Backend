import { Next , Res, Req } from "../../../framework/types/serverPackageTypes";


export  interface IorganizerUseCase{
    createOrganizer({name,email,password,country,state,city,pincode,ownerId,phoneNumber,companyLicense,companyInsurance,bankPassbook,building,otp}
         : {name:string, email : string, password: string,country:string,state:string, city: string, pincode:number, ownerId: any,phoneNumber:string, companyLicense:any, companyInsurance:any,bankPassbook: any,building : string,otp:string}, next : Next) : Promise < String | void >

    signupOrganzier(email:string,next:Next):Promise <void | string>   
}