import { booking } from "../../../entities/booking";


export interface IbookingRepository{
    addBooking(bookingData:booking,chargeId:string):Promise<any>
}