import { IeventPost } from "../../../entities/eventPost";
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";


export const eventPostCreation = async (data:IeventPost,eventPostRepository:IeventPostRepository):Promise<IeventPost | undefined>=>{
    try{

        const response = await eventPostRepository.eventPostCreation(data)
        return response ? response : undefined 

    }catch(error){
        throw error
    }
}