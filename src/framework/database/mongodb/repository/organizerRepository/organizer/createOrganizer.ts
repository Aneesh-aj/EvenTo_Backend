import { Iorganizer } from "../../../../../../entities/organizer";
import addressModel from "../../../model/address";
import organizerModel from "../../../model/organizer";


export const createOrganizer = async (newUser: Iorganizer, organizerModels: typeof organizerModel): Promise <Iorganizer | void> =>{
     try{
         console.log("entering to the repo",newUser.phoneNumber)

        const orgnaizer = await organizerModel.create({
         name:newUser.name,
         email:newUser.email,
         password:newUser.password,
         phoneNumber:newUser.phoneNumber,
         ownerId:newUser.ownerId,
         bankPassbook:newUser.bankPassbook,
         companyInsurance:newUser.companyInsurance,
         companyLicense:newUser.companyLicense
      })
        console.log("organizer details ::::===>",orgnaizer)
          if(orgnaizer){
             return orgnaizer
          }
     }catch(error){
      console.log("herereee")
      console.log(error)
        throw error
     }
}
