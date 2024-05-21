import { booking } from "../../../entities/booking";


export interface IbookingRepository{
    addBooking(bookingData:booking,chargeId:string):Promise<any>
    getAllBookings(id:string):Promise<any>
    getEventBookings(id:string):Promise<any>
}