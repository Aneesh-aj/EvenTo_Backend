import { Iorganizer } from "../../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const findbyId = async(id :string):Promise < Iorganizer | null>=>{
    try{
     console.log(" repo")
  
     const organizer = await organizerModel.findById(id)
     console.log(" the founded organizer",organizer)
    return organizer ? organizer:null
    }catch(error){
       throw error
    }
}