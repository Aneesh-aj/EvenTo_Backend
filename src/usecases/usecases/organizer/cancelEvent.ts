import { Ievents } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const cancelEvent = async(eventId:string,organizerId:string,eventRepository:IeventRepository):Promise<Ievents []|undefined>=>{
    try{
        const status ="cancelled"
        const changedStatus = await eventRepository.changeStatus(eventId,status)
        const events = await eventRepository.getUpcomingEvent(organizerId)
        return events
    }catch(error){
        throw error
    }
}