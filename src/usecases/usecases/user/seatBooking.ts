import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const seatBooking = async(id:string,selectedSeat:[],userId:string,eventRepository:IeventRepository):Promise <any>=>{
    try{

        const event = await eventRepository.seatBooking(id,selectedSeat,userId)
          
         console.log("---------------------------function-----------------------------==>",event)
        
        return event

    }catch(error){
        throw error
    }
}