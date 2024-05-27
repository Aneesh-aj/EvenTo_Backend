import { Imessage } from "../../../../entities/message";
import { IconversationRepository } from "../../../../usecases/interface/repositoryInterface/conversationRepository";
import conversationModel from "../model/conversation";


export class ConversationRepository implements IconversationRepository {
    async findConversation(senterId: string, receiverId: string): Promise<any> {
        try {
            const conversation = await conversationModel.find({
                participants: { $all: [senterId, receiverId] }
            });
            return conversation ? conversation : undefined
        } catch (error) {
            throw error
        }
    }

    async  createConversation(senterId: string, receiverId: string, message: Imessage): Promise<any> {
        try{
            const conversation =await conversationModel.create({participants:[senterId,receiverId],messages:[message._id]})
            return conversation
        }catch(error){
            throw error
        }
    }

    async  addMessage(senterId:string,receiverId:string,message: Imessage): Promise<any> {
        try{
            const conversation = await conversationModel.find({
                participants: { $all: [senterId, receiverId] }
            });
            return conversation
        }catch(error){
            throw error
        }
    }
}