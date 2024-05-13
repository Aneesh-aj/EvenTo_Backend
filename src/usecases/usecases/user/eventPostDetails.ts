import { Ievents } from "../../../entities/event"
import { IeventPost } from "../../../entities/eventPost"
import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository"
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"


export const eventPostDetails = async(id:string,eventPostRepository:IeventPostRepository,eventRepository:IeventRepository,organizerRepository:IorganizerRepository):Promise<{post:IeventPost,event:Ievents,organizer:{id:string,name:string}} | undefined >=>{
    try{
     const post = await eventPostRepository.getPostByid(id)
     if(post){
        const event = await eventRepository.getById(post.eventId)
        if(event){
            const organizer = await organizerRepository.findbyId(event.organizerId)
             console.log(" ----------------------------got the orgnaizer------------------",organizer)
             return organizer ? {post,event,organizer:{id:organizer._id as string,name:organizer.name}} : undefined
        }
     }
     return undefined
  
    }catch(error){
        throw error
    }
}