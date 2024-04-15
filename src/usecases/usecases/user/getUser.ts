import { Iaddress } from "../../../entities/address"
import { Iuser } from "../../../entities/user"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"


export const getUser= async (id:string,userRepoistory:IuserRepository):Promise<{user:Iuser , address:Iaddress}| {user:Iuser}| undefined>=>{
    try{
      const user = await userRepoistory.getUser(id)
      if(!user)return undefined
      const address = await userRepoistory.getAddress(id)
      if(!address)return {user}
      return user&&address? {user,address}: undefined
    }catch(error){
        throw error
    }
}