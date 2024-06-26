import mongoose,{Model, Schema} from "mongoose";
import { Iuser } from "../../../../entities/user"


const userSchema : Schema<Iuser>  = new mongoose.Schema({
    
    name:{type:String, required:true},
    email:{type:String, requried:true},
    password:{type:String,required:true},
    blocked:{type:Boolean,default:false},
    role:{type:String,default:'user'},
    phoneNumber:{type:String},
    profileImage:{type:String}
})

const userModel:Model<Iuser> =  mongoose.model('user',userSchema)
export default userModel