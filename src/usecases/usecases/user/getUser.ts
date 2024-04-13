import { Iuser } from "../../../entities/user"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"


export const getUser= async (id:string,userRepoistory:IuserRepository):Promise<Iuser| undefined>=>{
    try{
      const user = await userRepoistory.getUser(id)
      return user? user : undefined
    }catch(error){
        throw error
    }
}