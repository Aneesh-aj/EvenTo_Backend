import { IeventCategory } from "./eventCategory";


export interface IeventFormData{

    name:string,
    organizerId:string,
    eventCategory:{
        _id:string,
        category:string,
        delete:boolean,
        active:boolean
    },
    eventCountry:string,
    eventState:string,
    eventCity:string,
    location:string,
    eventType:string,
    paymentMethod:string,
    paymentAmount?:string,
    email:string,
     country:string,
    state:string,
    city:string,
    phoneNumber:string,
    startingTime:object,
      endingTime:object,
    date:object,
    seatArrangement?:[],
    seatNumber?:number,
    totalAmount:number
     
}


export interface Ievents{

    name:string,
    organizerId:string,
    eventCategory:IeventCategory[],
    eventCountry:string,
    eventState:string,
    eventCity:string,
    location:string,
    eventType:string,
    paymentMethod:string,
    paymentAmount?:string,
    email:string,
     country:string,
    state:string,
    city:string,
    phoneNumber:string,
    startingTime:object,
      endingTime:object,
    date:object,
    seatArrangement?:[],
    seatNumber?:number
    status:string,
    totalAmount:number,
    paymentStatus:boolean,
     
}


