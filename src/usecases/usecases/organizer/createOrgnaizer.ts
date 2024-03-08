import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { Ihashpassword } from "../../interface/service/hashPassword";
// import { Ijwt } from "../../interface/service/jwt";


export const createOrganizers = async(
    
   OrganizerRepository:IorganizerRepository ,hashPassword: Ihashpassword,
   name: string,email:string,password:string,   ownerId:any,phoneNumber:string
,companyLicense: any,companyInsurance:any,bankPassbook:any,
     building:string,country:string,state:string,city:string,pincode:number,otp:string,otpRepository:IotpRepository
    
    ) : Promise <string | void > =>{
        console.log("befoer the firebase ")
        console.log("email is",email, " and otp",otp,"name" ,name)

        let verify = await otpRepository.findOtp(email)
        console.log(" the veficationotp",verify?.otp)
          console.log("foudn the otp",verify)
        if(verify?.otp === otp){
             console.log("otp verified")
            
                  let encryptPassword = await hashPassword.createHash(password)
                  password = encryptPassword

                  console.log("pass word hashsed",password,"and name",name)
              const user = await OrganizerRepository.createOrganizer({name,email,phoneNumber,password,ownerId,companyLicense,companyInsurance,bankPassbook})
             
               let userId = user?._id
              if(userId){
                  const address = await OrganizerRepository.createAddress({country,state,city,pincode,building,userId})
                  console.log(" addres ss creatineddd",address)
                   return 
                 }
                
        }else{
            console.log("in the else case")
        }


    return 

} 

