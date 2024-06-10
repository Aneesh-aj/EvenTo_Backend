import { IeventFormData, Ievents } from "../../../entities/event";
import { IeventPost } from "../../../entities/eventPost";
import { Irequest } from "../../../entities/request";


export interface IeventRepository{
    createEvent(data:IeventFormData):Promise<{ success:boolean, message:string} | undefined>
    getAllEvents(id:string,limit:number,offset:number):Promise<Ievents []>
    getEventDetails(id:string):Promise <Ievents | undefined >
    getById(id:string):Promise <Ievents | undefined>
    getSeat(id:string):Promise<{seat:[]} | undefined>
    seatBooking(id:string,selectedSeat:[],userId:string):Promise <boolean>
    confirmSeat(id:string,userId:string,selectedSeat:[]):Promise<boolean>
    getUpcomingEvent(id:string,limit:number,offset:number):Promise<Ievents [] | undefined>
    changeStatus(eventId:string,status:string):Promise<any>
    findAndUpdate(data:IeventFormData,eventId:string):Promise<boolean>
    createRequestEvent(data:Irequest):Promise<{ success:boolean, message:string} | undefined>
    getByOrganizer(organizerId:string):Promise<Ievents [] | undefined>

}