import { IconversationRepository } from "../../interface/repositoryInterface/conversationRepository"
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository"

export const sendMessage = async(senterId:string,receiverId:string,message:string,imageUrl:string,messageRepository:ImessageRepository,conversationRepository:IconversationRepository):Promise<any>=>{
    try{
        const messages = await messageRepository.createMessage(senterId,receiverId,message,imageUrl)
        console.log("---------------message------------------",messages)
        if(!messages) return {success:false,message:"message could'nt sent!!"}
        const conversation = await conversationRepository.findConversation(senterId,receiverId)
          console.log("---------------- conversation ----------------",conversation)
        if(conversation){
            const addedMessage = await  conversationRepository.addMessage(senterId,receiverId ,messages) 
             console.log("------------------- added message-------------------",addedMessage)
        }else{
            const newConversation = await conversationRepository.createConversation(senterId,receiverId,messages)
            console.log("------------------- created conversation-------------------",newConversation)

        }
    }catch(error){
         throw error
    }
}