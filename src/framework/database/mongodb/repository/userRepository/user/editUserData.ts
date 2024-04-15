import { Iuser } from "../../../../../../entities/user"
import userModel from "../../../model/userModel"


export const editUserData = async (id:string,phoneNumber:string,name:string):Promise<Iuser | undefined>=>{
    try{
        const user = await userModel.findByIdAndUpdate(id,{phoneNumber:phoneNumber,name:name})
          console.log("useeeeeeee",user)
        return user ? user : undefined
    }catch(error){
        throw error
    }
}