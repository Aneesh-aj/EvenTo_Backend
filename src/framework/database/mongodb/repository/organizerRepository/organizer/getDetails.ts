import { Iorganizer } from "../../../../../../entities/organizer";
import addressModel from "../../../model/address";
import organizerModel from "../../../model/organizer";


export const getDetails = async (id:string,organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
        console.log("inside the repo")
         
         const org  = await organizerModel.findById(id)
         const userId = id
         const addres = await addressModel.findOne({userId})
         const orgWithAddress = org ? { ...org.toObject(), address: addres } : null;
         return orgWithAddress

    }catch(error){
        throw error
    }
}