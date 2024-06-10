import { IeventPost } from "../../../../../../entities/eventPost";
import eventPostModel from "../../../model/eventPost";
import mongoose from "mongoose";

export const getAllPosts = async (): Promise<IeventPost[]> => {
    try {
        const posts = await eventPostModel.aggregate([
            {
                $addFields: {
                    eventIdObj: { $toObjectId: "$eventId" }
                }
            },
            {
                $lookup: {
                    from: 'events', 
                    localField: 'eventIdObj',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            {
                $unwind: '$event' 
            },
            {
                $project: {
                    _id: 1,
                    eventId: 1,
                    image: 1,
                    organizerId: 1,
                    about: 1,
                    title: 1,
                    subTitle: 1,
                    seatArrangment: 1,
                    entryFormId: 1,
                    categoryId: 1,
                    event: 1 
                }
            }
        ]);

        console.log(posts);
        posts.reverse()
        return posts;
    } catch (error) {
        console.error(error); 
        throw error;
    }
}
