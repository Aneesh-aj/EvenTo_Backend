import { response } from "express";
import { booking } from "../../../entities/booking";
import { IbookingRepository } from "../../interface/repositoryInterface/bookingRepository";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const bookingCreation = async(bookingData:booking,chargeId:string,bookingRepository:IbookingRepository,eventRepository:IeventRepository):Promise<any>=>{
    try{
         const response  = await bookingRepository.addBooking(bookingData,chargeId)
           console.log("-------------first function-------------",response)
            if(!response) return false
         const   booked = await eventRepository.confirmSeat(bookingData.eventId,bookingData.userId,bookingData?.seat as [])
            console.log("-----------------is  boooked---------")
         return response ? true : false
    }catch(error){
        throw error
    }
}