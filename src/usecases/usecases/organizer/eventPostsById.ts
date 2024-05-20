import { IeventPost } from "../../../entities/eventPost";
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";


export const eventPostsById = async(organizerId:string,eventPostRepository:IeventPostRepository):Promise < IeventPost [] | undefined>=>{
    try{
         const eventPosts = await eventPostRepository.getPostByOrganizerId(organizerId)
        return eventPosts
    }catch(error){
        throw error
    }
}