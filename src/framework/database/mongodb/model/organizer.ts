import { Schema, Model } from "mongoose";
import mongoose from "mongoose";
import { Iorganizer } from "../../../../entities/organizer";
import { ObjectId } from "mongodb";


const OrganizerSchema : Schema <Iorganizer> = new mongoose.Schema({
    name: {type:String, required:true},
    role:{type:String,default:'organizer'},
    email:{type:String, required:true},
    password:{type:String, required:true},
    phoneNumber: {type:String , required:true},
    ownerId:{type:String, required:true},
    companyLicense:{type:String, required:true},
    companyInsurance:{type:String, required:true},
    bankPassbook:{type:String, required:true},
    approved:{type:Boolean,default:false},
    blocked:{type:Boolean,default:false},
    backgroundImage:{type:String},
    profileImage:{type:String}
})

const organizerModel : Model<Iorganizer> = mongoose.model('organizer',OrganizerSchema)

export default organizerModel