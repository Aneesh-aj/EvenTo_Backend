import { IeventPost } from "../../../entities/eventPost";
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";


export const getAlleventPost = async (eventPostRepository :IeventPostRepository):Promise <IeventPost []>=>{
    try{
        const posts = await eventPostRepository.getAll()
        return posts
    }catch(error){
        throw error
    }
}