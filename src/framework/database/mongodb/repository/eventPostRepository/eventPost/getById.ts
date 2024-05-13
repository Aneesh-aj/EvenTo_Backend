import { IeventPost } from "../../../../../../entities/eventPost";
import eventPostModel from "../../../model/eventPost";

export const getById = async (id:string):Promise <IeventPost | undefined>=>{
     try{

        const post = await eventPostModel.findById(id)
         console.log(" the post--------------",post)
        return post ? post : undefined

     }catch(error){
        throw error
     }
}