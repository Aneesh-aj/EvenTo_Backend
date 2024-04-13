import { Iorganizer } from "../../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const findbyId = async(id :string):Promise < Iorganizer | null>=>{
     const organizer = await organizerModel.findById(id)
     return organizer ? organizer:null
}