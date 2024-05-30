import mongoose, { Model, Schema } from "mongoose";
import { Ievents } from "../../../../entities/event";
import { IeventCategory } from "../../../../entities/eventCategory";
import { ObjectId } from "mongodb";

const eventSchema :Schema <Ievents> = new  mongoose.Schema({
    name:{type:String},
    organizerId:{type:String},
    eventCategory:{
         id:{type:ObjectId},
         category:{type:String},
         delete:{type:Boolean},
         active:{type:Boolean}
     },
    eventCountry:{type:String},
    eventState:{type:String},
    eventCity:{type:String},
    location:{type:String},
    eventType:{type:String},
    paymentMethod:{type:String},
    paymentAmount:{type:String},
    email:{type:String},
     country:{type:String},
    state:{type:String},
    city:{type:String},
    phoneNumber:{type:String},
    startingTime:{type:String},
      endingTime:{type:String},
    date:{type:String},
    seatArrangement: { type:Array },
    seatNumber:{type:Number},
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed","cancelled"], 
      default: "upcoming" 
    },
    totalAmount:{type:Number},
    userId:{type:String},
    eventBooking:{type:String},
    paymentStatus:{type:Boolean,default:false},
    
})

const eventModal : Model<Ievents> = mongoose.model('event',eventSchema)

export default eventModal