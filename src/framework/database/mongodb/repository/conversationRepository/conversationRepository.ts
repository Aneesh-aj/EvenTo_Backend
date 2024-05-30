import { ObjectId } from "mongodb";
import { Imessage } from "../../../../../entities/message";
import { IconversationRepository } from "../../../../../usecases/interface/repositoryInterface/conversationRepository";
import conversationModel from "../../model/conversation";
import organizerModel from "../../model/organizer";
import userModel from "../../model/userModel";
import { findById } from "./conversation/findById";


export class ConversationRepository implements IconversationRepository {
    async findConversation(senderId: string, receiverId: string): Promise<any> {

        try {
            const conversation = await conversationModel
                .findOne({ participants: { $all: [senderId, receiverId] } })
                .populate('messages')
                .exec();

            if (!conversation) {
                console.log("not founddddd-------------")
                return undefined;
            }

            const isOrganizer = await organizerModel.exists({ _id: senderId });

            if (isOrganizer) {
                // If the sender is an organizer, perform a lookup for user and message
                const result = await conversationModel
                    .findOne({ participants: { $all: [senderId, receiverId] } })
                    .populate('messages')
                    .populate({
                        path: 'participants',
                        model: 'user' // Assuming your user model is named 'user'
                    })
                    .exec();

                return result ? result : undefined;
            } else {
                // If the sender is a user, perform a lookup for organizer and message
                const result = await conversationModel
                    .findOne({ participants: { $all: [senderId, receiverId] } })
                    .populate('messages')
                    .populate({
                        path: 'participants',
                        model: 'organizer' // Assuming your organizer model is named 'organizer'
                    })
                    .exec();
                return result ? result : undefined;
            }
        } catch (error) {
            throw error
        }
    }

    async createConversation(senterId: string, receiverId: string, message: Imessage): Promise<any> {
        try {
            const conversation = await conversationModel.create({ participants: [senterId, receiverId], messages: [message._id] })
            return conversation
        } catch (error) {
            throw error
        }
    }

    async addMessage(senterId: string, receiverId: string, message: Imessage): Promise<any> {
        try {
            const conversation = await conversationModel.findOneAndUpdate(
                {
                    participants: { $all: [senterId, receiverId] }
                },
                {
                    $push: { messages: message._id }
                },
                { new: true }
            );
            return conversation
        } catch (error) {
            throw error
        }
    }


    async findById(id: string): Promise<any> {
        try {
            const chat = await findById(id)
            return chat
        } catch (error) {
            throw error
        }
    }
}