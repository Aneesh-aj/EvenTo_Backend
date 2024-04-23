import { Iaddress } from "../../../../../../entities/address";
import addressModel from "../../../model/address";
export const addAddress = async (newaddress:Iaddress,addressModels:typeof addressModel): Promise <Iaddress> =>{
    try{
         const address = await addressModel.create({
            country:newaddress.country,
            state:newaddress.state,
            city:newaddress.city,
            pincode:newaddress.pincode,
            building:newaddress.building,
            userId:newaddress.userId
        })
         await address.save()
         return address
    }catch(error){
        throw error
    }
}