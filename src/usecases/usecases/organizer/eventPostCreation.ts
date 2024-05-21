import { IeventPost } from "../../../entities/eventPost";
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const eventPostCreation = async (data:IeventPost,eventRepository:IeventRepository,eventPostRepository:IeventPostRepository):Promise<IeventPost | undefined>=>{
    try{  
          console.log(" ________________functionss-------------")
        const event:any = await eventRepository.getById(data.eventId)
         console.log(" after hte eevent fectsss",data,event?.eventCategory.id as any)
        const response = await eventPostRepository.eventPostCreation(data,event?.eventCategory.id as string)
        return response ? response : undefined 

    }catch(error){
        throw error
    }
}