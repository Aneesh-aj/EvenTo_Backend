import { Iorganizer } from "../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const getAllorganizer = async (organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
        console.log("inside the repo")
         
         const org  = await organizerModel.find({approved:true})
         console.log("jjjjjj",org)
         if(org){
            return org
         }else{
            return
         }
    }catch(error){
        console.log("error in findemail ",error)
    }
}