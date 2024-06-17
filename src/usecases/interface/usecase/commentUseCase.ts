import { Icomment } from "../../../entities/comments";
import { Ipost } from "../../../entities/posts";
import { Next } from "../../../framework/types/serverPackageTypes";

export interface IcommentUseCase{
      getComments(postId:string,next:Next):Promise<Icomment []|  undefined>
      postLike(postId:string,userId:string,next:Next):Promise<Ipost [] | undefined>
      addComments(postId:string,userId:string,text:string,next:Next):Promise<Icomment [] | undefined>
      // deleteComment(postId:string,commentId:string,next:Next):Promise<void>
}