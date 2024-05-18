import { Ievents } from "../../../entities/event";
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const getSeats = async(id:string,eventPostRepository:IeventPostRepository):Promise< any | undefined>=>{
    try{
        const event = await eventPostRepository.postAndEvent(id)
         
        //   console.log(" the resssssss-=----------------",event)
        return event

    }catch(error){
        throw error
    }
}