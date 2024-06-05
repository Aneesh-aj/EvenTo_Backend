import { Ipost } from "../../../entities/posts";
import { IpostRepository } from "../../interface/repositoryInterface/postRepository";


export const updatePosts = async(postId:string,data:Ipost,postRepository:IpostRepository):Promise<{success:boolean,message:string} | undefined>=>{
    try{
       const updated = await postRepository.updatePost(postId,data)
       return updated
    }catch(error){
        throw error
    }
}