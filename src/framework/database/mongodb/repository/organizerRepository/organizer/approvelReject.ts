import { Iorganizer } from "../../../../../../entities/organizer";
import addressModel from "../../../model/address";
import organizerModel from "../../../model/organizer";


export const reject = async (id:string,organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
        console.log("inside the repo")
         
         const org  = await organizerModel.findByIdAndDelete(id)
         const userId = id
         const address = await addressModel.findOneAndDelete({userId})
         console.log(address)
         console.log(" org", org)
        
         if(address){
            return address
         }
         else{
            return 
         }

    }catch(error){
        throw error
    }
}