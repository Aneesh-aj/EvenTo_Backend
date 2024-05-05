import { IeventFormData, Ievents } from "../../../entities/event";
import { IeventCategory } from "../../../entities/eventCategory";
import { Iorganizer, IorganizerAndAddress } from "../../../entities/organizer";
import { Next , Res, Req } from "../../../framework/types/serverPackageTypes";
import { IToken } from "../service/jwt";


export  interface IorganizerUseCase{
    createOrganizer({name,email,password,country,state,city,pincode,ownerId,phoneNumber,companyLicense,companyInsurance,bankPassbook,building,otp}
         : {name:string, email : string, password: string,country:string,state:string, city: string, pincode:number, ownerId: any,phoneNumber:string, companyLicense:any, companyInsurance:any,bankPassbook: any,building : string,otp:string}, next : Next) : Promise < Iorganizer | void >

    signupOrganzier(email:string,name:string,next:Next):Promise <boolean | void>  
    verifyOtp(email:string,otp:string,next:Next):Promise<boolean | void> 
    isApproved(id : string,next:Next):Promise<boolean>
    login(email:string,password:string,next:Next):Promise<{organizer:Iorganizer , tokens:IToken} | void>
    uploedImage(id:string,url:string,next:Next):Promise<string | null>
    // findbyId(id:string,next:Next):Promise<Iorganizer | null>
    uploadProfile(id:string,url:string,next:Next):Promise<string | null>
    resentOtp(email:string,next:Next):Promise<void>
    allDetailsById(id:string,next:Next):Promise<IorganizerAndAddress | undefined>
    getAllCategory(next:Next):Promise<IeventCategory[] | undefined>
    editProfile(id:string,formData:any,next:Next):Promise < void>
    getCategory(id:string,next:Next):Promise< [] | undefined>
    createEvent(data:IeventFormData,next:Next):Promise < {success:boolean, message:string} | undefined >
     getAllevents(id:string,next:Next):Promise < Ievents [] | undefined>
     getEventDetails(id:string,next:Next):Promise<Ievents | {event:Ievents , organizer:Iorganizer} | undefined>
}