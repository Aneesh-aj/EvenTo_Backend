import { Ievents } from "../../../entities/event";
import { Iorganizer } from "../../../entities/organizer";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const getEventDetails = async(id:string,eventRepository:IeventRepository,organizerRepository:IorganizerRepository):Promise<Ievents |{event:Ievents , organizer:Iorganizer} | undefined> =>{
    try{
         const eventDetails= await eventRepository.getEventDetails(id)

         if(eventDetails){
            const organizer = await  organizerRepository.findbyId(eventDetails?.organizerId)
             console.log(" the organizer ",organizer)
            if(eventDetails&& organizer) return {event:eventDetails,organizer:organizer}
         }

        return  undefined
    }catch(error){
        throw error
    }
}