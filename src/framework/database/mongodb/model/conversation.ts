import mongoose, { Model, Schema } from "mongoose";
import { Iconversation } from "../../../../entities/conversation";
import { ObjectId } from "mongodb";

const conversationSchema : Schema<Iconversation> = new mongoose.Schema({
     participants:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
     ],
     messages:[{ type:mongoose.Schema.Types.ObjectId, ref: 'message' }]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
},{timestamps:true})


const conversationModel : Model<Iconversation> = mongoose.model('conversation',conversationSchema)

export default conversationModel