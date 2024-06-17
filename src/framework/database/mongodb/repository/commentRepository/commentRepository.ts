import { Icomment } from "../../../../../entities/comments";
import { Ipost } from "../../../../../entities/posts";
import { IcommentRepository } from "../../../../../usecases/interface/repositoryInterface/commenetRepository";
import {addComment, getComments, postLike} from "./comments/index"


export class CommentRepository implements IcommentRepository{
    
    async getComment(postId: string): Promise<Icomment[] | undefined> {
        return await getComments(postId)
    }
    async  postLike(postId: string, userId: string): Promise<any | undefined> {
        return await postLike(postId,userId)
    }
   
    async  addComment(postId: string,userId:string,text:string): Promise<Icomment[] | undefined> {
        return await addComment(postId,text,userId)
    }

}