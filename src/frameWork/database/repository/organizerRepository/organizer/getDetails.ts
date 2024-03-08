import { Iorganizer } from "../../../../../entities/organizer";
import addressModel from "../../../model/address";
import organizerModel from "../../../model/organizer";


export const getDetails = async (id:string,organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
        console.log("inside the repo")
         
         const org  = await organizerModel.findById(id)
         let userId = id
         const addres = await addressModel.findOne({userId})
         console.log(addres)
         console.log(" org", org)
        
         const orgWithAddress = org ? { ...org.toObject(), address: addres } : null;
         return orgWithAddress

    }catch(error){
        console.log("error in findemail ",error)
    }
}