import { Ievents } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const getUpcomingEvent = async(id:string,eventRepository:IeventRepository):Promise<Ievents [] | undefined>=>{
    try{
        const events = await eventRepository.getUpcomingEvent(id)
        return events
    }catch(error){
        throw error
    }
}