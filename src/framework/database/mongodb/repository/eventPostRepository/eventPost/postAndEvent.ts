import eventPostModel from "../../../model/eventPost"

import mongoose from 'mongoose';

export const postAndEvent = async (id: string): Promise<any> => {
    try {
        // Ensure the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid post ID');
        }

        console.log(" here");
       
        const post = await eventPostModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }  // Filter by the provided id
            },
            {
                $addFields: {
                    eventIdObjectId: { $toObjectId: "$eventId" }
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: "eventIdObjectId",
                    foreignField: "_id",
                    as: "eventDetails"
                }
            },
            {
                $project: {
                    eventIdObjectId: 0
                }
            }
        ]);

        console.log("------------------------------------------", post);

        return post;
    } catch (error) {
        console.error("Error in postAndEvent function:", error);
        throw error;
    }
};
