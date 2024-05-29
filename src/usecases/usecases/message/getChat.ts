import { IconversationRepository } from "../../interface/repositoryInterface/conversationRepository"


export const getChat=async(senterId:string,receiverId:string,conversationRepository:IconversationRepository):Promise<any>=>{
    try{
         const conversation = await conversationRepository.findConversation(senterId,receiverId)
         if(!conversation)return {success:false,message:"no conversation Avalible" , chat:null}

         return {success:true,message:"conversation avalible", chat:conversation}
    }catch(error){
        throw error
    }
}