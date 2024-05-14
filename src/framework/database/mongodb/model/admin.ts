import mongoose, { Model, Schema } from "mongoose";
import { Iadmin } from "../../../../entities/admin";


const AdminSchema :Schema <Iadmin> = new  mongoose.Schema({
     role:{type:String,default:'admin'},
     email:{type:String},
     password:{type:String}
})

const adminModel : Model<Iadmin> = mongoose.model('admin',AdminSchema)

export default adminModel