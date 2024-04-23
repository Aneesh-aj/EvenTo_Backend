import { defaultMaxListeners } from "events";
import { Iaddress } from "../../../../entities/address";
import { Model,Schema } from "mongoose";
import mongoose from "mongoose";


const AddressSchema : Schema <Iaddress> = new mongoose.Schema({
     country:{type:String},
     state:{type:String},
     city:{type:String},
     pincode:{type:Number},
     userId:{type:String},
     building:{type:String}

})


const addressModel : Model<Iaddress> = mongoose.model('adress',AddressSchema)
export default addressModel