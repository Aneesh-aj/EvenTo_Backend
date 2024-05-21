import { IbookingRepository } from "../../interface/repositoryInterface/bookingRepository"

export const getAllbookings = async(eventId:string,bookingRepository:IbookingRepository):Promise<any>=>{
    try{
          const allBookings = await bookingRepository.getEventBookings(eventId)
          return allBookings
    }catch(error){
        throw error
    }
}