import { Iaddress } from "../../../../../../entities/address";
import addressModel from "../../../model/address";


export const getAddress = async (id:string):Promise < Iaddress | undefined>=>{
    try{
                const address = await addressModel.findOne({userId:id})
    console.log(" got the address",address)
    return address?address:undefined
    }catch(error){
         throw error
    }
}