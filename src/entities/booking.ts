export interface booking{
    userId:string,
    eventId:string,
    transationId?:string,
    seat?:[],
    numberOfentry:number,
    formId?:string,
    paidAmound?:number
}