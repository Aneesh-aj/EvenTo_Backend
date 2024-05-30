import mongoose from "mongoose";
import conversationModel from "../../../model/conversation";
import organizerModel from "../../../model/organizer";
import userModel from "../../../model/userModel";

export const findById = async (senterId: string): Promise<any> => {
    try {
        console.log("The id ------------", senterId);

        const id = new mongoose.Types.ObjectId(senterId);

        const isOrganizer = await organizerModel.findById(id);
        if (isOrganizer) {
            const conversation = await conversationModel.aggregate([
                {
                    $match: {
                        participants: id
                    }
                },
                {
                    $lookup: {
                        from: "messages",
                        localField: "messages",
                        foreignField: "_id",
                        as: "messageDetails"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "participants",
                        foreignField: "_id",
                        as: "participantDetails"
                    }
                }
            ]);
            return conversation;
        } else {
            const isUser = await userModel.findById(id);
            if (isUser) {
                const conversation = await conversationModel.aggregate([
                    {
                        $match: {
                            participants: id
                        }
                    },
                    {
                        $lookup: {
                            from: "messages",
                            localField: "messages",
                            foreignField: "_id",
                            as: "messageDetails"
                        }
                    },
                    {
                        $lookup: {
                            from: "organizers",
                            localField: "participants",
                            foreignField: "_id",
                            as: "participantDetails"
                        }
                    }
                ]);
                return conversation;
            } else {
                throw new Error("ID not found in both user and organizer collections");
            }
        }
    } catch (error) {
        console.error("Error in findById: ", error);
        throw error;
    }
};
