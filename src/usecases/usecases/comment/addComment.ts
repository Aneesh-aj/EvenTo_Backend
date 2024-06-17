import { Icomment } from "../../../entities/comments"
import { IcommentRepository } from "../../interface/repositoryInterface/commenetRepository"

export const addComments= async(postId:string,userId:string,text:string,commentRepository:IcommentRepository):Promise<Icomment [] | undefined>=>{
    try{
        const comments = await commentRepository.addComment(postId,userId,text)
        return comments
    }catch(error){
        throw error
    }
}