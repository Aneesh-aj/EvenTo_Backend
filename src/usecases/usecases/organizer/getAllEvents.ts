import { Ievents } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const getAllEvents = async(id:string,limit:number,offset:number,eventRepository:IeventRepository):Promise<Ievents []>=>{
   try{
     const events = await eventRepository.getAllEvents(id,limit,offset)
     return events
   }catch(error){
      throw error
   }
}