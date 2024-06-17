import { Icomment } from "../../../entities/comments";
import { IcommentRepository } from "../../interface/repositoryInterface/commenetRepository";

export const getComment= async(postId:string,commentRepository:IcommentRepository):Promise<Icomment []| undefined>=>{
    try{
       const comments = await commentRepository.getComment(postId)
       return comments
    }catch(error){
        throw error
    }
}