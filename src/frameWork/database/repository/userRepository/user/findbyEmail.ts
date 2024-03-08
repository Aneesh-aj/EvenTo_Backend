import userModel  from "../../../model/userModel";
import { Iuser } from "../../../../../entities/user";

export const findbyEmail = async (userModels:typeof userModel ,email:string):Promise <  Iuser| void > =>{
     let result =  await  userModels.findOne({email})
     if(result){
        return result
     }else{
        return 
     }
}