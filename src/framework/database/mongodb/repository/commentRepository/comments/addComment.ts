import mongoose from "mongoose";
import { Icomment } from "../../../../../../entities/comments";
import commentModel from "../../../model/comments";

export const addComment= async(postId:string,text:string,userId:string):Promise<Icomment [] | undefined>=>{
    try{

        const newComment = await commentModel.create({postId:postId,userId:userId,text:text});
         console.log( " new oemmemem",newComment)
           
            const comments = await commentModel.aggregate([
              { $match: { postId: new mongoose.Types.ObjectId(postId) } },
              {
                $lookup: {
                  from: 'users',
                  localField: 'userId',
                  foreignField: '_id',
                  as: 'user'
                }
              },
              { $unwind: '$user' },
              {
                $lookup: {
                  from: 'comments',
                  localField: 'replies',
                  foreignField: '_id',
                  as: 'replies'
                }
              },
              { $unwind: { path: '$replies', preserveNullAndEmptyArrays: true } },
              {
                $lookup: {
                  from: 'users',
                  localField: 'replies.userId',
                  foreignField: '_id',
                  as: 'replies.user'
                }
              },
              { $unwind: { path: '$replies.user', preserveNullAndEmptyArrays: true } },
              {
                $group: {
                  _id: '$_id',
                  postId: { $first: '$postId' },
                  userId: { $first: '$userId' },
                  user: { $first: '$user' },
                  text: { $first: '$text' },
                  createdAt: { $first: '$createdAt' },
                  replies: { $push: '$replies' }
                }
              }
            ]);

            console.log(" the comments ")
            return comments
        
    }catch(error){
        throw error
    }
}