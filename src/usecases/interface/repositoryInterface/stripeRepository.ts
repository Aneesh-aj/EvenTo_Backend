

export interface Istripe{
    payment(eventId:string,userId:string,seats:[],amount:string,):Promise<any>
}