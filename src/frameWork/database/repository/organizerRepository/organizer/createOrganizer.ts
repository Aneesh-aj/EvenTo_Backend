import { Iorganizer } from "../../../../../entities/organizer";
import addressModel from "../../../model/address";
import organizerModel from "../../../model/organizer";


export const createOrganizer = async (newUser: Iorganizer, organizerModels: typeof organizerModel): Promise <Iorganizer | void> =>{
     try{
         console.log("entering to the repo",newUser)

        const orgnaizer = await organizerModel.create(newUser)
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
