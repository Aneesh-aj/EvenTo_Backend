import { NextFunction } from "express";
import { Icomment } from "../../entities/comments";
import { IcommentUseCase } from "../interface/usecase/commentUseCase";
import { catchError } from "../middleares/catchError";
import { addComments, getComment, postLike } from "./comment/index"
import { IcommentRepository } from "../interface/repositoryInterface/commenetRepository";
export class CommentUseCase implements IcommentUseCase {

  constructor(
    private commentRepository: IcommentRepository
  ) { }

  async getComments(postId: string, next: NextFunction): Promise<Icomment[] | undefined> {
    try {
      const comments = await getComment(postId, this.commentRepository)
      return comments
    } catch (error) {
      catchError(error, next)
    }
  }

  async postLike(postId: string, userId: string, next: NextFunction): Promise<any | undefined> {
    try {
      const comments = await postLike(postId,userId,this.commentRepository)
      return comments
    } catch (error) {
    }

  }

  async addComments(postId: string, userId: string, text: string, next: NextFunction): Promise<Icomment[] | undefined> {
    try {
      const comments = await addComments(postId,userId,text, this.commentRepository)
      return comments
    } catch (error) {
    }

  }


}