import { IpostRepository } from "../../interface/repositoryInterface/postRepository";


export const deletePost = async(postId:string,postRepository:IpostRepository):Promise<{success:boolean,message:string} | undefined>=>{
    try{ 

        const deletePost = await postRepository.deletePost(postId)
        return deletePost
    }catch(error){
        throw error
    }
}