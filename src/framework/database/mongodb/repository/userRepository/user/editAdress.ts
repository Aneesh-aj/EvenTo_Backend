import { Iaddress } from "../../../../../../entities/address";
import addressModel from "../../../model/address";


export const editAddress = async (id:string,country:string,state:string,city:string,pinCode:string):Promise < Iaddress | undefined>=>{
    console.log('in the repo',id,country,state,city,pinCode)
    const edited = await addressModel.updateOne({userId:id},{userId:id,country:country,state:state,city:city,pincode:pinCode},{upsert:true})
    if(edited) {
        const address = await addressModel.findOne({userId:id})
        console.log(" edited",edited)
        return address? address: undefined
    }
    
    return undefined
}