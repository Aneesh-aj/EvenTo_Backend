import { Iorganizer } from "../../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const getAll = async (organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
         const org  = await organizerModel.find()
         if(org){
            return org
         }else{
            return 
         }
    }catch(error){
         throw error
    }
}