import mongoose from "mongoose";
import { Icomment } from "../../../../../../entities/comments";
import commentModel from "../../../model/comments";


export const getComments = async (postId: string): Promise<Icomment[] | undefined> => {
    try {


        const comments = await commentModel.aggregate([
            { $match: { postId: new mongoose.Types.ObjectId(postId) } },
            {
                $lookup: {
                    from: 'users', // The collection to join with (users)
                    localField: 'userId', // The field from the comments collection
                    foreignField: '_id', // The field from the users collection
                    as: 'user' // The name of the new array field to add to the documents
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
      
        return comments 
    } catch (error) {
        throw error
    }
}