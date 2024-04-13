import { Iuser } from "../../../../../../entities/user";
import userModel from "../../../model/userModel";


export const getUser= async(id:string):Promise<Iuser | undefined>=>{
    try{
        const user = await userModel.findById(id)
        return user ? user : undefined
    
    }catch(error){
        throw error
    }
}