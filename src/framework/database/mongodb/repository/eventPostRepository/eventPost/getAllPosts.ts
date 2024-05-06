import { IeventPost } from "../../../../../../entities/eventPost";
import eventPostModel from "../../../model/eventPost";


export const getAllPosts = async ():Promise<IeventPost []>=>{
    try{
      const posts = await eventPostModel.find()
      return posts
    }catch(error){
        throw error
    }
}