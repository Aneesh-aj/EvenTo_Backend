import { IbookingRepository } from "../../interface/repositoryInterface/bookingRepository";

export const getAllbookings = async(id:string,bookingRepository:IbookingRepository):Promise<any>=>{
    try{
        
        const bookings = await bookingRepository.getAllBookings(id)
         return bookings
    }catch(error){
        throw error
    }
}