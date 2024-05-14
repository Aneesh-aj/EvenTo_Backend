import { booking } from "../../../../entities/booking";
import { IbookingRepository } from "../../../../usecases/interface/repositoryInterface/bookingRepository";
import bookingModel from "../model/booking";


export class BookingRepository implements IbookingRepository {

    async  addBooking(bookingData:booking,chargeId:string): Promise<any> {
        try{

            const booking = await bookingModel.create(bookingData)
            console.log(" booking done",booking)
               return booking
        }catch(error){
            throw error
        }
    }

}