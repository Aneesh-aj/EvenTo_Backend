import { ObjectId } from "mongodb";
import { IprofileFormData } from "../../../../../../entities/organizer"
import addressModel from "../../../model/address"
import organizerModel from "../../../model/organizer";



export const editOrganizer = async (id:string,user:IprofileFormData):Promise< void>=>{
     try{
          console.log("======================================================================>",user.about)
          const objectId = new ObjectId(id);

          console.log(" the ned----------------------------------------------")
          const updatedDetails = await organizerModel.findByIdAndUpdate({_id:objectId},{name:user?.name,email:user.email,phoneNumber:user.phoneNumber,eventCategory:user.eventCategory,about:user?.about})
           console.log(" ------------------------------------------after the organizer updation --------------------------------------",updatedDetails)
          return 
     }catch(error){
         throw error
     }
}