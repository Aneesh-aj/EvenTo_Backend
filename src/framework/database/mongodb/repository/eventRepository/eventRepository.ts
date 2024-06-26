import { IeventFormData, Ievents } from "../../../../../entities/event";
import { Irequest } from "../../../../../entities/request";
import { IeventRepository } from "../../../../../usecases/interface/repositoryInterface/eventRepository";
import { io } from "../../../../service/socketIo";
import eventModal from "../../model/event";
const { DateTime } = require('luxon');



export class EventRepository implements IeventRepository {
    async createEvent(data: IeventFormData): Promise<{ success: boolean, message: string } | undefined> {
        try {
            console.log(" comming here")
            console.log("--------------------------seart--------------------------------------", data)
            if (!data.seatNumber) {
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
                eventBooking: data.eventBooking
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

    async getAllEvents(id: string, limit: number, offset: number): Promise<Ievents[]> {
        try {
            let allEvents = await eventModal.find({ organizerId: id });
            allEvents = allEvents.reverse();
            const events = allEvents.slice(offset, offset + limit);
            console.log("All the events", events);

            return events;
        } catch (error) {
            throw error
        }
    }

    async getEventDetails(id: string): Promise<Ievents | undefined> {
        try {
            const event = await eventModal.findById(id)

            console.log(" the response for the event Finding----", event)
            return event ? event : undefined
        } catch (error) {
            throw error
        }
    }

    async getById(id: string): Promise<Ievents | undefined> {
        try {

            const events = await eventModal.findById(id)
            // console.log(" the events got by id", events)
            return events ? events : undefined
        } catch (error) {
            throw error
        }
    }
    async getSeat(id: string): Promise<{ seat: [] } | undefined> {
        try {
            console.log(" the id ", id)
            const seats = await eventModal.findById(id)
            // console.log(" the detailsss", seats)
            if (seats && seats.seatArrangement) {
                return seats ? { seat: seats?.seatArrangement } : undefined
            }
        } catch (error) {
            throw error
        }
    }

    async seatBooking(id: string, selectedSeat: [], userId: string): Promise<boolean> {
        try {
            const events = await eventModal.findById(id);
            if (events) {
                let result = false;
                selectedSeat.forEach((elem: any) => {
                    events.seatArrangement?.forEach((ele: any) => {
                        if (elem?.row === ele?.row && ele?.column === elem.column) {
                            if (ele?.booked || ele.isSelected) {
                                result = true;
                            } else if (!ele.isSelected) {
                                ele.userId = userId;
                                ele.isSelected = true;
                            }
                        }
                    });
                });
                events.markModified('seatArrangement');
                await events.save();
                setTimeout(async () => {
                    const updatedEvents: any = await eventModal.findById(id)
                    selectedSeat.forEach((elem: any) => {
                        updatedEvents.seatArrangement?.forEach((ele: any) => {
                            if (elem?.row === ele?.row && ele?.column === elem.column) {
                                if (!ele?.booked && ele.userId === userId) {
                                    console.log("---------------- updateing the status of the seat-------------------", ele.row, ele.column)
                                    ele.isSelected = false
                                    ele.userId = ""
                                }
                            }
                        });
                    });

                    updatedEvents.markModified('seatArrangement');
                    await updatedEvents.save();
                    io.emit("seatSelected", { data: updatedEvents })

                }, 2 * 60 * 1000)
                return result;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    async confirmSeat(id: string, userId: string, selectedSeat: []): Promise<boolean> {
        try {
            const events = await eventModal.findById(id);
            if (events) {
                console.log("cominggg to therereeerrererererereerrerrererer------------------------");
                selectedSeat.forEach((elem: any) => {
                    events.seatArrangement?.forEach((ele: any) => {
                        if (elem?.row === ele?.row && ele?.column === elem.column) {
                            console.log(`The row is ${ele.row} and the column is ${ele.column}`);
                            ele.userId = userId;
                            ele.isSelected = true;
                            ele.booked = true;
                        }
                    });
                });

                events.markModified('seatArrangement');

                await events.save();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    async getUpcomingEvent(id: string, limit: number, offset: number): Promise<Ievents[] | undefined> {
        try {
            let allEvents = await eventModal.find({
                organizerId: id,
                $or: [{ status: "upcoming" }, { status: "ongoing" }]
            });
            allEvents = allEvents.reverse();
            const events = allEvents.slice(offset, offset + limit);

            console.log("All the events", events);

            return events;
        } catch (error) {
            throw error
        }
    }

    async changeStatus(eventId: string, status: string): Promise<any> {
        try {
            console.log(" status changeing",eventId,status)
            const changesStatus = await eventModal.findByIdAndUpdate(eventId, { status: status }, { upsert: true })
            console.log("------------------------- changes Status----------", changesStatus)
            console.log(" afterr-----------------")
            return changesStatus
        } catch (error) {
            throw error
        }
    }

    async findAndUpdate(data: IeventFormData, eventId: string): Promise<boolean> {
        try {

            console.log(" before the creation ", data, " and the id ", eventId)

            const updated = await eventModal.findByIdAndUpdate(eventId, data)
            console.log(" updated eent ---------------------", updated)
            return updated ? true : false

        } catch (error) {
            throw error
        }
    }

    async createRequestEvent(data: Irequest): Promise<{ success: boolean; message: string; } | undefined> {
        try {
            const event = await eventModal.create(data)
            return event ? { success: true, message: "created successfully" } : { success: false, message: "error while creating" }
        } catch (error) {
            throw error
        }
    }


    async getByOrganizer(organizerId:string):Promise<Ievents [] |undefined>{
        try{
           const events =  await eventModal.find({organizerId:organizerId})
           return events 
        }catch(error){
            throw error
        }
    }

    async  getAll(): Promise<Ievents[] | undefined> {
        try{

            const response = await eventModal.find()
            return response
        }catch(error){
            throw error
        }
    }

}