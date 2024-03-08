import mongoose from 'mongoose'
require('dotenv').config()
const dbString:string = process.env.mongoDb || ''

const conncetDb = async()=>{
    try{
       await mongoose.connect(dbString)
       .then((data:any)=>console.log(`db connected on ${data.connection.host}`))
    }catch(error:any){
          console.log(error.message)
          setTimeout(conncetDb,5000)
    }
}

export default conncetDb