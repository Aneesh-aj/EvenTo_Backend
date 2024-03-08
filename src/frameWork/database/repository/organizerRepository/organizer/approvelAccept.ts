import { Iorganizer } from "../../../../../entities/organizer";
import addressModel from "../../../model/address";
import organizerModel from "../../../model/organizer";


export const approve = async (id:string,organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
        console.log("inside the repo")
         
         const org  = await organizerModel.findByIdAndUpdate(id,{approved:true})
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