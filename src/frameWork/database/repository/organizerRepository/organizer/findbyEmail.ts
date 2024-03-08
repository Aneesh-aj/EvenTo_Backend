import { Iorganizer } from "../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const findbyEmail = async (email : string,organizerModels: typeof organizerModel) : Promise < string | void > =>{
    try{
        console.log("inside the repo")
         
         const org = await organizerModel.findOne({email})
         if(email) return 
    }catch(error){
        console.log("error in findemail ",error)
    }
}