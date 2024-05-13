import { IeventFormData, Ievents } from "../../../../../entities/event";
import { IeventRepository } from "../../../../../usecases/interface/repositoryInterface/eventRepository";
import eventModal from "../../model/event";
const { DateTime } = require('luxon');



export class EventRepository implements IeventRepository {
    async createEvent(data: IeventFormData): Promise<{ success: boolean, message: string } | undefined> {
        try {
            console.log(" comming here")
            console.log("--------------------------seart--------------------------------------", data)
           if(!data.seatNumber){
               data.seatNumber = data.seatArrangement?.length
           }
            
            const event = await eventModal.create({
                name: data.name,
                organizerId: data.organizerId,
                eventCategory: {
                    id: data.eventCategory?._id,
                    category: data.eventCategory?.category,
                    delete: data.eventCategory?.delete,
                    active: data.eventCategory?.active
                },
                eventCountry: data.eventCountry,
                eventState: data.eventState,
                eventCity: data.eventCity,
                location: data.location,
                eventType: data.eventType,
                email: data.email,
                country: data.country,
                state: data.state,
                city: data.city,
                phoneNumber: data.phoneNumber,
                startingTime: data.startingTime,
                endingTime: data.endingTime,
                date: data.date,
                seatArrangement: data.seatArrangement,
                seatNumber: data.seatNumber,
                paymentAmount: data.paymentAmount,
                paymentMethod: data.paymentMethod,
                totalAmount: data.totalAmount,
                eventBooking:data.eventBooking
            })
            console.log(" the event si createdssss ------------------------------------", event)
            if (event) {
                console.log(" ---------------------------if case----------")
                return { success: true, message: "created" }
            } else {
                console.log("=------------- else case-------------------")
                return undefined
            }

        } catch (error) {
            throw error
        }
    }

    async getAllEvents(id: string): Promise<Ievents[]> {
        try {
            const events = await eventModal.find({ organizerId: id })
            console.log(" all the events", events)
            return events
        } catch (error) {
            throw error
        }
    }

    async getEventDetails(id:string):Promise <Ievents | undefined>{
        try{
            const event = await eventModal.findById(id)

            console.log(" the response for the event Finding----",event)
            return event ? event : undefined
        }catch(error){
            throw error
        }
    }

    async  getById(id: string): Promise<Ievents | undefined> {
        try{

           const events = await eventModal.findById(id)
           console.log(" the events got by id",events)
           return events ? events : undefined
        }catch(error){
            throw error
        }   
    }
    async  getSeat(id: string): Promise<{seat:[]} | undefined> {
        try{
            console.log(" the id ",id)
            const seats = await eventModal.findById(id)
             console.log(" the detailsss",seats)
            if(seats&&seats.seatArrangement){
                return seats ? {seat:seats?.seatArrangement} : undefined
            }
        }catch(error){
             throw error
        }
    }

    async  seatBooking(id: string, selectedSeat: []): Promise<boolean> {
        try{
            const events = await eventModal.findById(id)
            if(events){
              const result =   selectedSeat.map((elem:any)=>{
                 console.log("iiii")
                     events.seatArrangement?.map((ele:any)=>{
                          if(elem?.row === ele?.row && ele?.column === elem.column){
                                if(ele?.booked){

                                    return  true
                                }else{
                                    return false
                                }
                          }
                     })
                })
                console.log(" th result from the backeind",result)
                return result ? true : false
            }
            
            return false
            

        }catch(error){
            throw error
        }
    }

    async  confirmSeat(id: string,userId:string, selectedSeat: []): Promise<boolean> {
        try{
            const events = await eventModal.findById(id)
            if(events){
               const result =   selectedSeat.map((elem:any)=>{
                     events.seatArrangement?.map((ele:any)=>{
                          if(elem?.row === ele?.row && ele?.column === elem.column){
                                if(ele?.booked){
                                     console.log(" checking ")
                                    return  true
                                }
                          }
                     })
                })
                //   console.log(" th result from the backeind",result)
                 return result ? true : false
            }else{
                return false
            }
            
           
            

        }catch(error){
            throw error
        }
    }
}