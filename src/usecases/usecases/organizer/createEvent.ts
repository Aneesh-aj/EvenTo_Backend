import { IeventFormData } from "../../../entities/event"
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository"


export const createEvents = async(data:IeventFormData,eventRepository:IeventRepository):Promise <{success:boolean, message:string} | undefined>=>{
    try{
           console.log("------------------- the function ssssdaa------------------------------------",data)
         const events = await eventRepository.createEvent(data)
       return events
    }catch(error){
        throw error
    }
}