import { IeventFormData, Ievents } from "../../../entities/event";


export interface IeventRepository{
    createEvent(data:IeventFormData):Promise<{ success:boolean, message:string} | undefined>
    getAllEvents(id:string):Promise<Ievents []>
}