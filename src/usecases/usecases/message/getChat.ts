import { IconversationRepository } from "../../interface/repositoryInterface/conversationRepository"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"


export const getChat=async(senterId:string,receiverId:string,conversationRepository:IconversationRepository,userRepository:IuserRepository,organizerRepository:IorganizerRepository):Promise<any>=>{
    try{
         const conversation = await conversationRepository.findConversation(senterId,receiverId)
         let organizer

          const user = await userRepository.getUser(receiverId)
          console.log(" the user---->",user)
          if(!user){
               organizer = await organizerRepository.findbyId(receiverId)
               if(!conversation){return {success:false,message:"no conversation Avalible" , chat:null,user:organizer}}
               else{
                   return {success:false,message:"no conversation Avalible" , chat:conversation,user:organizer}
               }
          }
          if(!conversation)return {success:false,message:"no conversation Avalible" , chat:null,user:user}

         return {success:true,message:"conversation avalible", chat:conversation , user:user }
    }catch(error){
        throw error
    }
}