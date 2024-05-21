import { IeventFormData } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const updateEvent = async(data:IeventFormData,eventId:string,evenetRepository:IeventRepository):Promise<{success:boolean, message:string} | undefined>=>{
  try{
        const updated = await evenetRepository.findAndUpdate(data,eventId)
        return updated ? {success:true,message:"successfully updated"} : {success:false,message:'something went wrong!!'}
  } catch(error){
     throw error
  }
}