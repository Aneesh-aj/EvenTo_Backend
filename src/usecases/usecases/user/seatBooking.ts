import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const seatBooking = async(id:string,selectedSeat:[],eventRepository:IeventRepository):Promise <any>=>{
    try{

        const event = await eventRepository.seatBooking(id,selectedSeat)
        console.log(" the reponse ------------",event)
        
        return event

    }catch(error){
        throw error
    }
}