import { IuserRepository } from "../../interface/repositoryInterface/userRepository";


export const getAllusers= async (userRepoistory:IuserRepository)=>{
    console.log(" it on the usecaseddd")
   let reslt = userRepoistory.getAllusers()
   return reslt
}