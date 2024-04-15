import { Iaddress } from "../../../entities/address";
import { Iuser } from "../../../entities/user";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";


export const editProfile = async (id:string,formData:any,userRepoistory:IuserRepository):Promise < {user:Iuser,address:Iaddress} | Iuser | undefined >=>{
   try{
         console.log("in the usecase file" , id,formData.phoneNumber,formData.name)
        const user = await userRepoistory.editUserData(id,formData.phoneNumber,formData.name)
        console.log("from theuser",user)
        if(!user)return undefined

        const address = await userRepoistory.editAddress(id,formData.country,formData.state,formData.city,formData.pinCode)
        console.log("form the address :",address)
       return  user&&address? {user,address}:undefined
        
   }catch(error){
     throw error
   }
}