import { Ievents } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const getAllEvents = async(id:string,eventRepository:IeventRepository):Promise<Ievents []>=>{
   try{
     const events = await eventRepository.getAllEvents(id)
     return events
   }catch(error){
      throw error
   }
}