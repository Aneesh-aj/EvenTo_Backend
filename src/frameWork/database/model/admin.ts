import mongoose, { Model, Schema } from "mongoose";
import { Iadmin } from "../../../entities/admin";
import { defaultMaxListeners } from "events";


const AdminSchema :Schema <Iadmin> = new  mongoose.Schema({
     email:{type:String},
     password:{type:String}
})

const adminModel : Model<Iadmin> = mongoose.model('admin',AdminSchema)

export default adminModel