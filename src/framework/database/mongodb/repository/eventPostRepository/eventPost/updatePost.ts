import { IeventPost } from "../../../../../../entities/eventPost";
import eventPostModel from "../../../model/eventPost";

export const updatedPost = async(formData:IeventPost,id:string):Promise<any>=>{
    try{
         
        const updatedPost = await eventPostModel.findOneAndUpdate({_id:id},{image:formData.image,title:formData.title,about:formData.about})
        console.log("updated post",updatedPost)
         return updatedPost ? updatedPost : undefined
    }catch(error){
        throw error
    }
}