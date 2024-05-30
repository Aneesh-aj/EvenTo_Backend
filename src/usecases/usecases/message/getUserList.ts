import { IconversationRepository } from "../../interface/repositoryInterface/conversationRepository"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"

export const getUserList= async(id:string,organizerRepository:IorganizerRepository,userRepository:IuserRepository,conversationRepository:IconversationRepository):Promise<any>=>{
   try{
        const getList = await conversationRepository.findById(id)
        return getList
   }catch(error){
      throw error
   }
}