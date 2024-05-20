import { IeventPost } from "../../../../../../entities/eventPost";
import eventPostModel from "../../../model/eventPost";


export const getPostByOrganizerId = async(organizerId:string):Promise<IeventPost [] | undefined>=>{
    try{
        const eventPosts = await eventPostModel.find({organizerId:organizerId})
        return eventPosts
    }catch(error){
         throw error
    }
}