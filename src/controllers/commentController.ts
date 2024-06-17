import { Next, Req, Res } from "../framework/types/serverPackageTypes";
import { IcommentUseCase } from "../usecases/interface/usecase/commentUseCase";
import ErrorHandler from "../usecases/middleares/errorHandler";



export class CommentController{
    private commentUsecase:IcommentUseCase
    constructor(commentUseCase:IcommentUseCase){
        this.commentUsecase = commentUseCase
    }
    
    async getCommets(req:Req,res:Res,next:Next){
        try{
             const {postId} = req.params
             const comments = await this.commentUsecase.getComments(postId,next)
             return res.json(comments)
        }catch(error:any){
            return next(new ErrorHandler(error, next)) 
        }
    }
   
     async postLike(req:Req,res:Res,next:Next){
        try{
            const {postId,userId} = req.body
            const likedPost = await this.commentUsecase.postLike(postId,userId,next)
            res.json(likedPost);

        }catch(error:any){
            return next(new ErrorHandler(error,next))
        }
     }


     async addComment(req:Req,res:Res,next:Next){
        try{
            const {postId,text,userId} =req.body
            console.log("  teh add comment")
            const comments = await this.commentUsecase.addComments(postId,userId,text,next)
            res.json(comments).status(200)
        }catch(error:any){
            return next(new ErrorHandler(error,next))
        }
     }

     async deleteComment(req:Req,res:Res,next:Next){
        try{
            // const deleted = await this.commentUsecase.deleteComment(postId,next:Next)
        }catch(error:any){
            return next(new ErrorHandler(error,next))
        }
     }

     async replyToComment(req:Req,res:Res,next:Next){
        try{

        }catch(error:any){
            return next(new ErrorHandler(error,next))
        }
     }




}
