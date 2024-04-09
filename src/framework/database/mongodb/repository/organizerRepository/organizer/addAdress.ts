import { Iaddress } from "../../../../../../entities/address";
import addressModel from "../../../model/address";
export const addAddress = async (newaddress:Iaddress,addressModels:typeof addressModel): Promise <Iaddress> =>{
    try{
         const address = await addressModel.create(newaddress)
         await address.save()
         return address
    }catch(error){
        throw error
    }
}