import { Ievents } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const getEventDetails = async(id:string,eventRepository:IeventRepository):Promise<Ievents | undefined> =>{
    try{
         const eventDetails= await eventRepository.getEventDetails(id)
        return eventDetails ? eventDetails : undefined
    }catch(error){
        throw error
    }
}