import { IeventPost } from "../../../entities/eventPost";
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const eventPostCreation = async (data:IeventPost,eventRepository:IeventRepository,eventPostRepository:IeventPostRepository):Promise<IeventPost | undefined>=>{
    try{  

        const event = await eventRepository.getById(data.eventId)

        const response = await eventPostRepository.eventPostCreation(data,event?.eventCategory[0].id as string)
        return response ? response : undefined 

    }catch(error){
        throw error
    }
}