import { IcommentRepository } from "../../interface/repositoryInterface/commenetRepository"

export const postLike=async(postId:string,userId:string,commentRepository:IcommentRepository)=>{
    try{
       const likedPost = await  commentRepository.postLike(postId,userId)
       return likedPost
    }catch(error){
        throw error
    }
}