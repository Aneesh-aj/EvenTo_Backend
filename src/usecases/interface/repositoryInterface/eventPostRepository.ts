import { IeventPost } from "../../../entities/eventPost";


export interface IeventPostRepository{
    eventPostCreation(data:IeventPost):Promise<IeventPost | undefined>
    getAll():Promise<IeventPost []>
}