import mongoose from "mongoose";
import { booking } from "../../../../entities/booking";
import { IbookingRepository } from "../../../../usecases/interface/repositoryInterface/bookingRepository";
import bookingModel from "../model/booking";


export class BookingRepository implements IbookingRepository {

    async  addBooking(bookingData:booking,chargeId:string): Promise<any> {
        try{            
            function generateRandomId() {
                const characters = '0123456789ABCDEF';
                let result = '';
                for (let i = 0; i < 8; i++) {
                  const randomIndex = Math.floor(Math.random() * characters.length);
                  result += characters[randomIndex];
                }
              
                return result;
              }
              
              let randomId;
              while (true) {
                randomId = generateRandomId();
                const isExist = await bookingModel.findOne({ bookingId: randomId });
                 console.log(" isExistss",isExist)
                if (!isExist) break;
              }
          
              bookingData.transationId = chargeId;
          
              const booking = await bookingModel.create({
                userId: bookingData.userId,
                eventId: bookingData.eventId,
                transationId: bookingData.transationId,
                seat: bookingData.seat,
                numberOfentry: bookingData.numberOfentry,
                paidAmound: bookingData.paidAmound,
                bookingId: randomId,
                postId:bookingData.postId
              });
          
              return booking;

        }catch(error){
            throw error
        }
    }

    async  getAllBookings(id: string): Promise<any> {
        try{
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid user ID');
        }

       
        const bookings = await bookingModel.aggregate([
            {
                $match: { userId: id }
            },
            {
                $addFields: {
                    eventIdObjectId: { $toObjectId: "$eventId" },
                    eventPostIdObjectId: { $toObjectId: "$postId" }
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: "eventIdObjectId",
                    foreignField: "_id",
                    as: "eventDetails"
                }
            },
            {
                $lookup: {
                    from: 'eventposts',
                    localField: "eventPostIdObjectId", 
                    foreignField: "_id",
                    as: "postDetails"
                }
            },
            {
                $project: {
                    eventIdObjectId: 0,
                    eventPostIdObjectId: 0 
                }
            }
        ]);

        console.log("Bookings found:", bookings);
          console.log("--------------bookinsss----",bookings);
          
              console.log("  bookin with look up",bookings)
             return bookings
        }catch(error){
             throw error
        }
    }

    async  getEventBookings(id: string): Promise<any> {
        try{
              const bookings = await bookingModel.aggregate([
                {
                    $match: { eventId: id }
                },
                {
                    $addFields: {
                        userIdObjectId: { $toObjectId: "$userId" },
                       
                    }
                },
                {

                $lookup:{
                    from:'users',
                    localField:"userIdObjectId",
                    foreignField:"_id",
                    as:"userDetails"
                }
              },{
                $project: {
                    userIdObjectId: 0,
                    
                }
            }
            ])

            return bookings

              console.log("---------------------lookup---------------------------",bookings)
        }catch(error){
            throw error
        }
    }

}