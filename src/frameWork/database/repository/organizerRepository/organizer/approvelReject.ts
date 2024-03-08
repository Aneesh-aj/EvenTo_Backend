import { Iorganizer } from "../../../../../entities/organizer";
import addressModel from "../../../model/address";
import organizerModel from "../../../model/organizer";


export const reject = async (id:string,organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
        console.log("inside the repo")
         
         const org  = await organizerModel.findByIdAndDelete(id)
         let userId = id
         const addres = await addressModel.findOneAndDelete({userId})
         console.log(addres)
         console.log(" org", org)
        
         if(addres){
            return addres
         }
         else{
            return 
         }

    }catch(error){
        console.log("error in findemail ",error)
    }
}