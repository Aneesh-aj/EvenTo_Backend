import { Ievents } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const getUpcomingEvent = async(id:string,limit:number,offset:number,eventRepository:IeventRepository):Promise<Ievents [] | undefined>=>{
    try{
        const events = await eventRepository.getUpcomingEvent(id,limit,offset)
        return events
    }catch(error){
        throw error
    }
}