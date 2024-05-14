import { response } from "express";
import { booking } from "../../../entities/booking";
import { IbookingRepository } from "../../interface/repositoryInterface/bookingRepository";

export const bookingCreation = async(bookingData:booking,chargeId:string,bookingRepository:IbookingRepository):Promise<any>=>{
    try{
         const response  = await bookingRepository.addBooking(bookingData,chargeId)
    }catch(error){
        throw error
    }
}