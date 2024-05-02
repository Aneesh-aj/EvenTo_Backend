import { Iaddress } from "../../../../../../entities/address";
import { IprofileFormData } from "../../../../../../entities/organizer";
import addressModel from "../../../model/address";



export const editAddress = async(id:string,address:IprofileFormData):Promise<void>=>{
    try{
            console.log(" the address form the  front---------------------------------------",address)
            const editedAddress = await addressModel.updateOne({userId:id},{country:address.country,state:address.state,city:address.city,building:address.building},{upsert:true})
            console.log("-------------------------------------------------after the of address updation---------------------",editedAddress)
            return 
    }catch(error){
        throw error
    }
}