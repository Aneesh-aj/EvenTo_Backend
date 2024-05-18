import { IbookingRepository } from "../../interface/repositoryInterface/bookingRepository";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const getAllbookings = async(id:string,bookingRepository:IbookingRepository,eventRepository:IeventRepository):Promise<any>=>{
    try{
        
        const bookings = await bookingRepository.getAllBookings(id)
        return bookings
    }catch(error){
        throw error
    }
}