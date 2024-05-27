import { ImessageRepository } from "../../../../usecases/interface/repositoryInterface/messageRepository";
import messageModel from "../model/message";


export class MessageRepository implements ImessageRepository{
     async  createMessage(senterId: string, receiverId: string, message: string, imageUrl: string): Promise<any> {
         try{
            const messages = await messageModel.create({senderId:senterId,receiverId:receiverId,message:message,media:imageUrl})
            return messages ? messages : undefined
         }catch(error){
            throw error
         }
     }
}