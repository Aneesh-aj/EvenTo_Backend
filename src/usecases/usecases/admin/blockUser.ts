import { IuserRepository } from "../../interface/repositoryInterface/userRepository";


export const blockUser= async (userRepoistory:IuserRepository,id:string)=>{
    console.log(" it on the usecaseddd")
   let reslt = await userRepoistory.blockUser(id)
   console.log("comingg here")
   return reslt
}