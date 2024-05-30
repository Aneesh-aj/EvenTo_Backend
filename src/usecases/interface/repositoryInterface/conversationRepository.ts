import { Imessage } from "../../../entities/message"

export interface IconversationRepository{
    findConversation(senterId:string,receiverId:string):Promise<any>
    addMessage(senterId:string,receiverId:string,message:Imessage):Promise<any>
    createConversation(senterId:string,receiverId:string,message:Imessage):Promise<any>
    findById(id:string):Promise<any>
}