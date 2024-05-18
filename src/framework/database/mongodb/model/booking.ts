import mongoose, { Model, Schema } from "mongoose"
import { booking } from "../../../../entities/booking"


const bookingSchema :Schema <booking> = new  mongoose.Schema({
      userId:{type:String},
      eventId:{type:String},
      transationId:{type:String},
      seat:{type:[]},
      numberOfentry:{type:Number},
      formId:{type:String},
      paidAmound:{type:Number},
      bookingId:{type:String},
      postId:{type:String}
})

const bookingModel : Model<booking> = mongoose.model('booking',bookingSchema)

export default bookingModel