import mongoose, { Model, Schema } from "mongoose";
import { IeventCategory } from "../../../../entities/eventCategory";


const categorySchema :Schema <IeventCategory> = new  mongoose.Schema({
       category:{type:String , required:true},
       delete:{type:Boolean ,default:false},
       active:{type:Boolean ,default:true}
})

const categoryModel : Model<IeventCategory> = mongoose.model('eventCategory',categorySchema)

export default categoryModel