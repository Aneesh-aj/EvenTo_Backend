import mongoose, { Model, Schema } from "mongoose";
import { Imessage } from "../../../../entities/message";

const messageSchema : Schema <Imessage> = new mongoose.Schema({
     senderId:{type:mongoose.Schema.Types.ObjectId},
     receiverId:{type:mongoose.Schema.Types.ObjectId , ref: 'message'},
     message:{type:String},
     media:{type:String}
},{timestamps:true})


const messageModel : Model<Imessage> = mongoose.model('message',messageSchema)

export default messageModel