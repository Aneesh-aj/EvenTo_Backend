import { IeventRepository } from "../../interface/repositoryInterface/eventRepository"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"

export const dashboard = async(userRepository:IuserRepository,organizerRepository:IorganizerRepository,eventRepository:IeventRepository)=>{
    try{

        const users = await userRepository.getAllusers()
        const organizer = await organizerRepository.getAll()
       const  events = await eventRepository.getAll()
        return {user:users.length,organizer:organizer?.length,events:events?.length}
    }catch(error){
        throw error
    }
}