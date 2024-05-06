
import mongoose, { Model, Schema } from "mongoose";
import { IregistrationInfo } from "../../../../entities/registrationInfo";


const registrationInfoSchema :Schema <IregistrationInfo> = new  mongoose.Schema({
     userId:{type:String},
     eventId:{type:String},
     noOfseats:{type:Number},
     seatDetails:{type:[]},
     phone:{type:String},
     name:{type:String},
     email:{type:String}
})

const registrationInfotModel : Model<IregistrationInfo> = mongoose.model('registrationInfo',registrationInfoSchema)

export default registrationInfotModel