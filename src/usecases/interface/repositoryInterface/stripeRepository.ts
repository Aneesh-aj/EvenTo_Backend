import { Req } from "../../../framework/types/serverPackageTypes"


export interface Istripe{
    payment(eventId:string,userId:string,seats:[],amount:string,):Promise<any>
    paymentStatus(req:Req):Promise<boolean | null>
}