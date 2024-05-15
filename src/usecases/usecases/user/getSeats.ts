import { Ievents } from "../../../entities/event";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const getSeats = async(id:string,eventRepository:IeventRepository):Promise< Ievents | undefined>=>{
    try{
        const event = await eventRepository.getById(id)
         
        //   console.log(" the resssssss-=----------------",event)
        return event

    }catch(error){
        throw error
    }
}