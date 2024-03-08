import { Iuser } from "../../../../../../entities/user";
import userModel from "../../../model/userModel";


export const createUser = async ( newUser: Iuser ,
      userModels:typeof userModel) : Promise <Iuser> =>{
         try{
            const user = await userModel.create(newUser)
            await user.save()
            console.log(user)
            return user
         }catch(error){
            throw error
         }
     }