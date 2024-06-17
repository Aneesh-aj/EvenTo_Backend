import { Icomment } from "../../../entities/comments";
import { Ipost } from "../../../entities/posts";

export interface IcommentRepository{
    getComment(postId:string):Promise<Icomment [] | undefined>
    postLike(postId:string,userId:string):Promise<Ipost [] | undefined>
    addComment(postId:string,userId:string,text:string):Promise<Icomment [] | undefined>
}