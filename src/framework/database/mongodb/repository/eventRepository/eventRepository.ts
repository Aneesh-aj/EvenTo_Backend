import { IeventFormData, Ievents } from "../../../../../entities/event";
import { IeventRepository } from "../../../../../usecases/interface/repositoryInterface/eventRepository";
import eventModal from "../../model/event";


export class EventRepository implements IeventRepository{
     async  createEvent(data: IeventFormData): Promise<{success:boolean,message:string}|undefined> {
         try{
            
             console.log("--------------------------seart--------------------------------------",data)
            const event = await eventModal.create({
                name:data.name,
                organizerId:data.organizerId,
                eventCategory:{
                     id:data.eventCategory?._id,
                     category:data.eventCategory?.category,
                     delete:data.eventCategory?.delete,
                     active:data.eventCategory?.active
                },
                eventCountry:data.eventCountry,
                eventState: data.eventState,
                eventCity :data.eventCity,
                location:data.location,
                eventType:data.eventType,
                email:data.email,
                country:data.country,
                state : data.state,
                city:data.city,
                 phoneNumber:data.phoneNumber,
                 startingTime:data.startingTime,
                 endingTime:data.endingTime,
                 date:data.date,
                 seatArrangement : data.seatArrangement,
                 seatNumber : data.seatNumber,


            })
            console.log(" the event si createdssss ------------------------------------", event)
            if(event){
                return {success:true,message:"created"}
            }else{
                return undefined
            }

         }catch(error){
            throw error
         }
     }

     async  getAllEvents(id: string): Promise<Ievents []> {
         try{
                const events = await eventModal.find({organizerId:id})
                console.log(" all the events",events)
                return events
         }catch(error){
              throw error
         }
     }
}