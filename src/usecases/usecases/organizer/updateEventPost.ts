import { IeventPost } from "../../../entities/eventPost";
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";


export const updateEventPost = async(formData:IeventPost,id:string,eventPostRepository:IeventPostRepository):Promise<any>=>{
    try{
        const  updatedPost = await eventPostRepository.updatePost(formData,id)
        return updatedPost
    }catch(error){
        throw error
    }
}