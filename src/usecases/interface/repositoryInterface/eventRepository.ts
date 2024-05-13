import { IeventFormData, Ievents } from "../../../entities/event";


export interface IeventRepository{
    createEvent(data:IeventFormData):Promise<{ success:boolean, message:string} | undefined>
    getAllEvents(id:string):Promise<Ievents []>
    getEventDetails(id:string):Promise <Ievents | undefined >
    getById(id:string):Promise <Ievents | undefined>
    getSeat(id:string):Promise<{seat:[]} | undefined>
    seatBooking(id:string,selectedSeat:[]):Promise <boolean>
}