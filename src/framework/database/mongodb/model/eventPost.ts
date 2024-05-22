
import mongoose, { Model, Schema } from "mongoose";
import { IeventPost } from "../../../../entities/eventPost";


const eventPostSchema :Schema <IeventPost> = new  mongoose.Schema({
     eventId:{type:String},
     image:{type:String},
     organizerId:{type:String},
     about:{type:String},
     title:{type:String},
     subTitle:{type:String},
     seatArrangment:{type:[]},
     entryFormId:{type:String},
     categoryId:{type:String}
})

const  eventPostModel : Model<IeventPost> = mongoose.model('eventPost',eventPostSchema)

export default eventPostModel