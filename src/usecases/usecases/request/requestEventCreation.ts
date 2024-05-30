import { Irequest } from "../../../entities/request";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";
import { IrequestRepository } from "../../interface/repositoryInterface/requestRepository";

export const requestEventCreation = async(data:Irequest,id:string,eventRepository:IeventRepository,requestRepository:IrequestRepository):Promise<{success:boolean, message:string} | undefined>=>{
    try{
         const events = await eventRepository.createRequestEvent(data)
         if(events){
              const request = await requestRepository.updateStatus(id)
         }
         return events
    }catch(error){
         throw error
    }
}